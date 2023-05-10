import 'package:flutter/material.dart';
import 'package:mobile/screens/home_page.dart';
import 'package:mobile/screens/schedule_page.dart';
import 'package:mobile/screens/students_page.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Instrutor Adriano',
      initialRoute: '/',
      routes: {
        '/': (context) => const HomePage(),
        '/students': (context) => const StudentsPage(),
        '/schedule': (context) => const SchedulePage(),
      },
      theme: ThemeData(
        primarySwatch: Colors.green,
      ),
    );
  }
}
