import 'package:flutter/material.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Image(
              image: AssetImage('assets/images/logo.png'),
              width: 200,
            ),
            ElevatedButton(onPressed: () {}, child: const Text('Minha agenda')),
            ElevatedButton(
                onPressed: () {
                  Navigator.pushNamed(context, '/students');
                },
                child: const Text('Meus alunos')),
            ElevatedButton(
                onPressed: () {
                  Navigator.pushNamed(context, '/schedule');
                },
                child: const Text('Agendar aula')),
          ],
        ),
      ),
    );
  }
}
