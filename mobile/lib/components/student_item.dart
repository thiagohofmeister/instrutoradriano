import 'package:flutter/material.dart';
import 'package:mobile/components/student_data.dart';
import 'package:mobile/models/student.dart';

class StudentItem extends StatelessWidget {
  final Student student;

  const StudentItem({Key? key, required this.student}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Card(
        child: Padding(
          padding: const EdgeInsets.fromLTRB(15, 10, 15, 10),
          child: StudentData(student: student),
        ),
      ),
    );
  }
}
