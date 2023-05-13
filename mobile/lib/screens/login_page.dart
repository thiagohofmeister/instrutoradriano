import 'package:flutter/material.dart';

class LoginPage extends StatelessWidget {
  const LoginPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final userController = TextEditingController();
    final passwordController = TextEditingController();

    return Scaffold(
      body: Form(
        child: Center(
          child: SingleChildScrollView(
            child: Column(
              children: [
                const Image(
                  image: AssetImage('assets/images/logo.png'),
                  width: 200,
                ),
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: TextField(
                    decoration: const InputDecoration(
                      border: OutlineInputBorder(),
                      hintText: 'E-mail, telefone ou CPF',
                    ),
                    controller: userController,
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: TextField(
                    obscureText: true,
                    decoration: const InputDecoration(
                      border: OutlineInputBorder(),
                      hintText: 'Senha',
                    ),
                    controller: passwordController,
                  ),
                ),
                ElevatedButton(
                  onPressed: () {},
                  child: const Text('Acessar'),
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}
