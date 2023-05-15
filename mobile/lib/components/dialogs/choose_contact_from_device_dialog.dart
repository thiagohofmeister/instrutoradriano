import 'package:contacts_service/contacts_service.dart';
import 'package:flutter/material.dart';
import 'package:permission_handler/permission_handler.dart';

class ChooseContactFromDeviceDialog extends StatefulWidget {
  const ChooseContactFromDeviceDialog({Key? key}) : super(key: key);

  @override
  State<ChooseContactFromDeviceDialog> createState() =>
      _ChooseContactFromDeviceDialogState();
}

class _ChooseContactFromDeviceDialogState
    extends State<ChooseContactFromDeviceDialog> {
  List<Contact> _contacts = [];

  Future<void> _getContacts() async {
    if (await Permission.contacts.request().isGranted) {
      Iterable<Contact> contacts = await ContactsService.getContacts();
      setState(() {
        _contacts = contacts.toList();
      });
    }
  }

  @override
  void initState() {
    super.initState();
    _getContacts();
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: const Text('Selecione um contato'),
      content: SizedBox(
        width: double.maxFinite,
        child: ListView.builder(
          itemCount: _contacts.length,
          itemBuilder: (BuildContext context, int index) {
            Contact contact = _contacts[index];
            return ListTile(
              title: Text(contact.displayName ?? ''),
              subtitle: Text(contact.phones?.first.value ?? ''),
              onTap: () {
                Navigator.of(context).pop({
                  'name': contact.displayName ?? '',
                  'phone': contact.phones?.first.value ?? '',
                });
              },
            );
          },
        ),
      ),
    );
  }
}
