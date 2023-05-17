import 'package:flutter/material.dart';
import 'package:mobile/components/dialogs/Search_zipcode_dialog.dart';
import 'package:mobile/components/dialogs/choose_contact_from_device_dialog.dart';
import 'package:mobile/models/student_create.dart';
import 'package:mobile/services/student_service.dart';

class CreateStudentPage extends StatefulWidget {
  const CreateStudentPage({Key? key}) : super(key: key);

  @override
  State<CreateStudentPage> createState() => _CreateStudentPageState();
}

class _CreateStudentPageState extends State<CreateStudentPage> {
  final _formKey = GlobalKey<FormState>();
  bool isSaving = false;

  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _phoneController = TextEditingController();
  final TextEditingController _zipCodeController = TextEditingController();
  final TextEditingController _numberController = TextEditingController();
  final TextEditingController _complementController = TextEditingController();

  void onSave() {
    setState(() {
      isSaving = true;
    });

    if (!_formKey.currentState!.validate()) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Preencha todos os campos!'),
        ),
      );

      setState(() {
        isSaving = false;
      });

      return;
    }

    StudentCreate student = StudentCreate(
      name: _nameController.text,
      phone: _phoneController.text,
      address: StudentAddressCreate(
        zipCode: _zipCodeController.text,
        number: _numberController.text,
      ),
    );

    StudentService().create(student).then((_) {
      Navigator.pop(context);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Cadastrar aluno"),
        actions: [
          MenuItemButton(
            onPressed: onSave,
            child: const Text(
              "Salvar",
              style: TextStyle(color: Colors.white),
            ),
          ),
        ],
      ),
      body: isSaving
          ? const Padding(
              padding: EdgeInsets.all(50),
              child: Center(child: CircularProgressIndicator()),
            )
          : Form(
              key: _formKey,
              child: SingleChildScrollView(
                child: Container(
                  padding: const EdgeInsets.fromLTRB(8, 16, 8, 0),
                  child: Column(
                    children: [
                      Padding(
                        padding: const EdgeInsets.only(bottom: 16.0),
                        child: TextFormField(
                          validator: (value) {
                            if (value != null && value.isEmpty) {
                              return 'Preencha o nome';
                            }
                            return null;
                          },
                          decoration: InputDecoration(
                            isDense: true,
                            border: const OutlineInputBorder(),
                            hintText: 'Nome',
                            suffixIcon: InkWell(
                                onTap: () {
                                  showDialog(
                                    context: context,
                                    builder: (BuildContext context) {
                                      return const ChooseContactFromDeviceDialog();
                                    },
                                  ).then(
                                    (value) {
                                      if (value != null) {
                                        _nameController.text =
                                            (value['name'] as String);

                                        _phoneController.text =
                                            (value['phone'] as String);
                                      }
                                    },
                                  );
                                },
                                child: const Icon(Icons.contacts_sharp)),
                          ),
                          controller: _nameController,
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.only(bottom: 16.0),
                        child: TextFormField(
                          validator: (value) {
                            if (value != null && value.isEmpty) {
                              return 'Preencha o telefone';
                            }
                            return null;
                          },
                          decoration: const InputDecoration(
                            border: OutlineInputBorder(),
                            hintText: 'Telefone',
                          ),
                          controller: _phoneController,
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.only(bottom: 16.0),
                        child: TextFormField(
                          validator: (value) {
                            if (value != null && value.isEmpty) {
                              return 'Preencha o CEP';
                            }
                            return null;
                          },
                          decoration: InputDecoration(
                              border: const OutlineInputBorder(),
                              hintText: 'CEP',
                              suffixIcon: InkWell(
                                onTap: () {
                                  showDialog(
                                    context: context,
                                    builder: (context) {
                                      return SearchZipcodeDialog(
                                        zipcodeController: _zipCodeController,
                                      );
                                    },
                                  );
                                },
                                child: const Icon(Icons.search),
                              )),
                          controller: _zipCodeController,
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.only(bottom: 16.0),
                        child: TextFormField(
                          validator: (value) {
                            if (value != null && value.isEmpty) {
                              return 'Preencha o número';
                            }
                            return null;
                          },
                          decoration: const InputDecoration(
                            border: OutlineInputBorder(),
                            hintText: 'Número',
                          ),
                          controller: _numberController,
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.only(bottom: 16.0),
                        child: TextField(
                          decoration: const InputDecoration(
                            border: OutlineInputBorder(),
                            hintText: 'Complemento',
                          ),
                          controller: _complementController,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
    );
  }
}
