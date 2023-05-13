import 'package:flutter/material.dart';
import 'package:mobile/components/template/data_label.dart';
import 'package:mobile/models/student.dart';

class StudentData extends StatelessWidget {
  const StudentData({super.key, required this.student, this.hideName = false});

  final Student student;
  final bool hideName;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        !hideName
            ? Padding(
                padding: const EdgeInsets.only(bottom: 8),
                child: DataLabel(label: 'Nome', info: student.name),
              )
            : Container(),
        Padding(
          padding: const EdgeInsets.only(bottom: 8),
          child: DataLabel(label: 'Telefone', info: student.phone),
        ),
        Padding(
          padding: const EdgeInsets.only(bottom: 8),
          child: DataLabel(
            label: 'Endereço',
            info: student.address.getFullAddress(),
          ),
        ),
        Padding(
          padding: const EdgeInsets.only(bottom: 8),
          child: DataLabel(
            label: 'Distância',
            info: student.address.getDistance(),
          ),
        ),
        Padding(
          padding: const EdgeInsets.only(bottom: 8),
          child: DataLabel(
            label: 'Tempo de deslocamento',
            info: student.address.getDistanceDuration(),
          ),
        ),
      ],
    );
  }
}
