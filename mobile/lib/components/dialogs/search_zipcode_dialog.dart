import 'package:flutter/material.dart';
import 'package:mobile/models/address_state.dart';
import 'package:mobile/models/get_address.dart';
import 'package:mobile/models/zipcode.dart';
import 'package:mobile/services/zipcode_service.dart';

class SearchZipcodeDialog extends StatefulWidget {
  final TextEditingController zipcodeController;

  const SearchZipcodeDialog({Key? key, required this.zipcodeController})
      : super(key: key);

  @override
  State<SearchZipcodeDialog> createState() => _SearchZipcodeDialogState();
}

class _SearchZipcodeDialogState extends State<SearchZipcodeDialog> {
  AddressState? _selectedAddressState;
  Zipcode? _selectedZipcode;
  String? _selectedCity;
  List<Zipcode> _zipCodes = [];
  List<AddressState> _states = [];

  final TextEditingController _streetController = TextEditingController();

  Future<void> _getStates() async {
    List<AddressState> result = await ZipcodeService().getStates();
    setState(() {
      _states = result;

      if (_states.isNotEmpty && _states.length == 1) {
        _selectedAddressState = _states.first;
      }
    });
  }

  @override
  void initState() {
    super.initState();
    _getStates();
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: const Text('Buscar CEP'),
      content: SingleChildScrollView(
        child: Column(children: [
          Padding(
            padding: const EdgeInsets.only(bottom: 16.0),
            child: DropdownButtonFormField(
              value: _selectedAddressState,
              validator: (value) {
                if (value == null) {
                  return 'Selecione o estado';
                }

                return null;
              },
              onChanged: (AddressState? addressState) {
                setState(() {
                  _selectedAddressState = addressState;
                });
              },
              items: _states.map((AddressState addressState) {
                return DropdownMenuItem<AddressState>(
                    value: addressState,
                    child: Text(
                      addressState.uf,
                      overflow: TextOverflow.ellipsis,
                    ));
              }).toList(),
              decoration: const InputDecoration(
                labelText: "UF",
                border: OutlineInputBorder(),
              ),
            ),
          ),
          _selectedAddressState != null
              ? Padding(
                  padding: const EdgeInsets.only(bottom: 16.0),
                  child: DropdownButtonFormField(
                    value: _selectedCity,
                    validator: (value) {
                      if (value == null) {
                        return 'Selecione a cidade';
                      }

                      return null;
                    },
                    onChanged: (String? city) {
                      setState(() {
                        _selectedCity = city;
                      });
                    },
                    items: _selectedAddressState!.cities.map((String city) {
                      return DropdownMenuItem<String>(
                        value: city,
                        child: Text(city),
                      );
                    }).toList(),
                    decoration: const InputDecoration(
                      labelText: "Cidade",
                      border: OutlineInputBorder(),
                    ),
                  ),
                )
              : Container(),
          Padding(
            padding: const EdgeInsets.only(bottom: 16.0),
            child: TextFormField(
              validator: (value) {
                if (value != null && value.isEmpty) {
                  return 'Preencha a rua';
                }
                return null;
              },
              decoration: const InputDecoration(
                border: OutlineInputBorder(),
                hintText: 'Rua',
              ),
              controller: _streetController,
            ),
          ),
          ElevatedButton(
            onPressed: () {
              FocusScopeNode currentFocus = FocusScope.of(context);
              if (currentFocus.isFirstFocus) {
                currentFocus.unfocus();
              }

              GetAddress address = GetAddress(
                  uf: _selectedAddressState!.uf,
                  city: _selectedCity!,
                  street: _streetController.text);

              ZipcodeService().getZipcodeByAddress(address).then((response) {
                setState(() {
                  _zipCodes = response;

                  if (_zipCodes.length == 1) {
                    _selectedZipcode = _zipCodes.first;
                    widget.zipcodeController.text =
                        _selectedZipcode!.zipCode.replaceAll('-', '');
                  }
                });
              });
            },
            child: const Text("Buscar"),
          ),
          _zipCodes.isNotEmpty
              ? DropdownButtonFormField(
                  value: _selectedZipcode,
                  isExpanded: true,
                  onChanged: (Zipcode? zipCode) {
                    if (zipCode == null) {
                      return;
                    }

                    setState(() {
                      widget.zipcodeController.text = zipCode.zipCode;
                    });
                  },
                  items: _zipCodes.map((Zipcode zipCode) {
                    return DropdownMenuItem<Zipcode>(
                      value: zipCode,
                      child: Text(
                        '${zipCode.street} - ${zipCode.district}',
                        overflow: TextOverflow.ellipsis,
                      ),
                    );
                  }).toList(),
                  decoration: const InputDecoration(
                    labelText: "Logradouro",
                    border: OutlineInputBorder(),
                  ),
                )
              : Container(),
          _selectedZipcode != null
              ? Padding(
                  padding: const EdgeInsets.only(top: 16.0),
                  child: ElevatedButton(
                    onPressed: () {
                      Navigator.of(context).pop();
                    },
                    child: const Text('Confirmar'),
                  ),
                )
              : Container(),
        ]),
      ),
    );
  }
}
