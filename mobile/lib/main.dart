import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:mobile/screens/calendar_page.dart';
import 'package:mobile/screens/create_student_page.dart';
import 'package:mobile/screens/login_page.dart';
import 'package:mobile/screens/schedule_page.dart';
import 'package:mobile/screens/students_page.dart';
import 'package:mobile/store/schedule_store.dart';
import 'package:mobile/store/student_store.dart';
import 'package:provider/provider.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  bool isLogged = await hasToken();

  runApp(MultiProvider(
    providers: [
      ChangeNotifierProvider(create: (_) => StudentStore()),
      ChangeNotifierProvider(create: (_) => ScheduleStore()),
    ],
    child: MyApp(isLogged: isLogged),
  ));
}

Future<bool> hasToken() async {
  return true;
}

class MyApp extends StatelessWidget {
  final bool isLogged;

  const MyApp({super.key, required this.isLogged});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Instrutor Adriano',
      initialRoute: isLogged ? 'calendar' : 'login',
      routes: {
        'login': (context) => const LoginPage(),
        'calendar': (context) => const CalendarPage(),
        'students_list': (context) => const StudentsPage(),
        'schedule': (context) => const SchedulePage(),
        'create_student': (context) => const CreateStudentPage(),
      },
      localizationsDelegates: const [
        GlobalMaterialLocalizations.delegate,
      ],
      supportedLocales: const [
        Locale('pt'),
      ],
      theme: ThemeData(
        primarySwatch: Colors.green,
      ),
    );
  }
}
