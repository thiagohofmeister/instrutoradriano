import 'package:flutter/material.dart';

import '../models/Schedule.dart';

class StudentData extends StatelessWidget {
  const StudentData({super.key, required this.schedule});

  final Schedule schedule;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Text(schedule.studentName),
    );
  }
}
