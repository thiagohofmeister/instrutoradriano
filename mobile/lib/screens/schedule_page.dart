import 'package:flutter/material.dart';
import 'package:flutter_datetime_picker/flutter_datetime_picker.dart';
import 'package:intl/intl.dart';
import 'package:mobile/models/student.dart';

class SchedulePage extends StatefulWidget {
  const SchedulePage({Key? key}) : super(key: key);

  @override
  State<SchedulePage> createState() => _SchedulePageState();
}

class _SchedulePageState extends State<SchedulePage> {
  Student? _selectedStudent;
  int? _selectedClassOption;
  DateTime _selectedDateTime = DateTime.now();

  final Map<String, String> _classOptions = {
    "50": 'Uma aula',
    "75": 'Uma aula e meia',
    "100": 'Duas aulas',
  };

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: const Text("Agendar aula")),
        body: SingleChildScrollView(
          child: Container(
            padding: const EdgeInsets.all(16),
            child: Column(children: [
              DropdownButtonFormField(
                value: _selectedStudent,
                onChanged: (Student? student) {
                  setState(() {
                    _selectedStudent = student;
                  });
                },
                items: students.map((Student student) {
                  return DropdownMenuItem<Student>(
                      value: student, child: Text(student.name));
                }).toList(),
                decoration:
                    const InputDecoration(labelText: "Selecione o aluno"),
              ),
              DropdownButtonFormField(
                value: _selectedClassOption,
                onChanged: (int? value) {
                  setState(() {
                    _selectedClassOption = value;
                  });
                },
                items: const [
                  DropdownMenuItem(value: 50, child: Text('Uma aula')),
                  DropdownMenuItem(value: 75, child: Text('Uma aula e meia')),
                  DropdownMenuItem(value: 100, child: Text('Duas aulas')),
                ],
                decoration: const InputDecoration(
                    labelText: "Escolha a quantidade de aulas"),
              ),
              const SizedBox(height: 16),
              Row(
                children: [
                  const Text('Data da aula:', style: TextStyle(fontSize: 16)),
                  TextButton(
                    onPressed: () {
                      DateTime now = DateTime.now();
                      DatePicker.showDateTimePicker(context,
                          showTitleActions: true,
                          minTime: now,
                          maxTime: DateTime(now.year + 1, now.month, now.day),
                          onConfirm: (DateTime date) {
                        setState(() {
                          _selectedDateTime = date;
                        });
                      }, currentTime: _selectedDateTime, locale: LocaleType.pt);
                    },
                    child: Text(
                        DateFormat('dd/MM/yyyy HH:mm')
                            .format(_selectedDateTime),
                        style: const TextStyle(fontSize: 16)),
                  ),
                ],
              ),
              const SizedBox(height: 32),
              ElevatedButton(onPressed: () {}, child: const Text('Agendar')),
            ]),
          ),
        ));
  }
}
