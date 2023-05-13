import 'package:flutter/material.dart';

class NavDrawer extends StatelessWidget {
  const NavDrawer({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: ListView(
        children: [
          const DrawerHeader(
            child: Image(
              image: AssetImage('assets/images/logo.png'),
              width: 200,
            ),
          ),
          ListTile(
            leading: const Icon(Icons.calendar_month),
            title: const Text('Minha agenda'),
            onTap: () => {
              Navigator.pushReplacementNamed(context, 'calendar'),
            },
          ),
          ListTile(
            leading: const Icon(Icons.people),
            title: const Text('Meus alunos'),
            onTap: () => {
              Navigator.pushReplacementNamed(context, 'students_list'),
            },
          ),
          ListTile(
            leading: const Icon(Icons.schedule),
            title: const Text('Agendar aula'),
            onTap: () => {
              Navigator.pushReplacementNamed(context, 'schedule'),
            },
          ),
          // ListTile(
          //   leading: const Icon(Icons.border_color),
          //   title: const Text('Simular valor'),
          //   onTap: () => {Navigator.of(context).pop()},
          // ),
          // ListTile(
          //   leading: const Icon(Icons.exit_to_app),
          //   title: const Text('Logout'),
          //   onTap: () => {Navigator.of(context).pop()},
          // ),
        ],
      ),
    );
  }
}
