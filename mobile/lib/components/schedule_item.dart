import 'package:flutter/material.dart';
import 'package:mobile/components/template/data_label.dart';
import 'package:mobile/models/schedule.dart';
import 'package:url_launcher/url_launcher.dart';

class ScheduleItem extends StatelessWidget {
  final Schedule schedule;

  const ScheduleItem({Key? key, required this.schedule}) : super(key: key);

  Future<void> openMap() async {
    Uri uri = Uri.parse(
        'http://maps.google.co.in/maps?q=${schedule.student.address.getFullAddress()}');

    if (await canLaunchUrl(uri)) {
      await launchUrl(uri);
    } else {
      throw 'Could not launch ${uri.toString()}';
    }
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Card(
        child: Padding(
          padding: const EdgeInsets.fromLTRB(15, 10, 15, 10),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Padding(
                padding: const EdgeInsets.only(bottom: 8),
                child: DataLabel(
                  label: 'Aluno',
                  info: schedule.student.name,
                ),
              ),
              Padding(
                padding: const EdgeInsets.only(bottom: 8),
                child: DataLabel(
                  label: 'Início',
                  info: schedule.getInitialDate(),
                ),
              ),
              Padding(
                padding: const EdgeInsets.only(bottom: 8),
                child: DataLabel(
                  label: 'Final',
                  info: schedule.getFinalDate(),
                ),
              ),
              Padding(
                padding: const EdgeInsets.only(bottom: 8),
                child: DataLabel(
                  label: 'Duração',
                  info: schedule.getDuration(),
                ),
              ),
              Padding(
                padding: const EdgeInsets.only(bottom: 8),
                child: DataLabel(
                  label: 'Endereço',
                  info: schedule.student.address.getFullAddress(),
                ),
              ),
              Padding(
                padding: const EdgeInsets.only(bottom: 8),
                child: DataLabel(
                  label: 'Preço',
                  info: schedule.getAmount(),
                ),
              ),
              ElevatedButton(
                onPressed: openMap,
                child: const Text('Ir até o aluno'),
              )
            ],
          ),
        ),
      ),
    );
  }
}
