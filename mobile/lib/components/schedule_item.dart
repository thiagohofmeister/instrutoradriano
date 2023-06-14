import 'package:flutter/material.dart';
import 'package:maps_launcher/maps_launcher.dart';
import 'package:mobile/components/template/data_label.dart';
import 'package:mobile/models/schedule.dart';

class ScheduleItem extends StatelessWidget {
  final Schedule schedule;

  const ScheduleItem({Key? key, required this.schedule}) : super(key: key);

  Future<void> openMap() async {
    MapsLauncher.launchQuery(schedule.student.address.getFullAddress());
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
                  label: 'Total',
                  info: schedule.getTotalAmount(),
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
