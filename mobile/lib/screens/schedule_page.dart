import 'package:flutter/material.dart';
import 'package:mobile/components/inputs/date_picker_input.dart';
import 'package:mobile/components/inputs/time_picker_input.dart';
import 'package:mobile/components/student_data.dart';
import 'package:mobile/components/template/data_label.dart';
import 'package:mobile/components/template/nav_drawer.dart';
import 'package:mobile/models/calculate_price.dart';
import 'package:mobile/models/class_option.dart';
import 'package:mobile/models/schedule_create.dart';
import 'package:mobile/models/student.dart';
import 'package:mobile/services/schedule_service.dart';
import 'package:mobile/store/student_store.dart';
import 'package:provider/provider.dart';

class SchedulePage extends StatefulWidget {
  const SchedulePage({Key? key}) : super(key: key);

  @override
  State<SchedulePage> createState() => _SchedulePageState();
}

class _SchedulePageState extends State<SchedulePage> {
  final _formKey = GlobalKey<FormState>();

  Student? _selectedStudent;
  ClassOption? _selectedClassOption;
  DateTime _selectedDateTime = DateTime.now();
  CalculatePrice? _price;
  bool isSaving = false;

  List<ClassOption> _classOptions = [];

  Future<void> fetchPrice() async {
    CalculatePrice price =
        await ScheduleService().getCalculatePrice(_selectedStudent!.id);

    setState(() {
      _price = price;
    });
  }

  void toSchedule() {
    setState(() {
      isSaving = true;
    });

    if (!_formKey.currentState!.validate()) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Preencha todos os campos!'),
        ),
      );

      setState(() {
        isSaving = false;
      });

      return;
    }

    ScheduleCreate scheduleCreate = ScheduleCreate(
      classInitialDate: _selectedDateTime,
      studentId: _selectedStudent!.id,
      duration: _selectedClassOption!.duration,
    );

    ScheduleService().create(scheduleCreate: scheduleCreate).then((_) {
      Navigator.pushReplacementNamed(context, 'calendar');
    });
  }

  @override
  void initState() {
    super.initState();
    Provider.of<StudentStore>(context, listen: false).initialFetch();
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();

    final Student? studentFromArgs =
        ModalRoute.of(context)?.settings.arguments as Student?;

    if (studentFromArgs != null) {
      _selectedStudent = Provider.of<StudentStore>(context, listen: false)
          .items
          .firstWhere((i) => i.id == studentFromArgs.id);

      fetchPrice();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Agendar aula"),
        actions: [
          MenuItemButton(
            onPressed: toSchedule,
            child: const Text(
              "Agendar",
              style: TextStyle(color: Colors.white),
            ),
          ),
        ],
      ),
      drawer: const NavDrawer(),
      body: SingleChildScrollView(
        child: isSaving ||
                Provider.of<StudentStore>(context, listen: true).isLoading
            ? const Padding(
                padding: EdgeInsets.all(50),
                child: Center(child: CircularProgressIndicator()),
              )
            : Form(
                key: _formKey,
                child: Container(
                  padding: const EdgeInsets.all(16),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Consumer<StudentStore>(
                        builder: (context, store, child) {
                          return DropdownButtonFormField(
                            value: _selectedStudent,
                            validator: (value) {
                              if (value == null) {
                                return 'Selecione o aluno';
                              }

                              return null;
                            },
                            onChanged: (Student? student) {
                              if (student == null) {
                                return;
                              }

                              setState(() {
                                _selectedStudent = student;
                                fetchPrice();
                              });
                            },
                            items: store.items.map((Student student) {
                              return DropdownMenuItem<Student>(
                                  value: student, child: Text(student.name));
                            }).toList(),
                            decoration: const InputDecoration(
                              labelText: "Selecione o aluno",
                              border: OutlineInputBorder(),
                            ),
                          );
                        },
                      ),
                      _selectedStudent != null
                          ? Padding(
                              padding: const EdgeInsets.only(top: 15.0),
                              child: StudentData(
                                student: _selectedStudent!,
                                hideName: true,
                              ),
                            )
                          : Container(),
                      _price != null && _price!.options.isNotEmpty
                          ? Padding(
                              padding: const EdgeInsets.only(top: 16.0),
                              child: DropdownButtonFormField(
                                value: _selectedClassOption?.duration,
                                validator: (value) {
                                  if (value == null) {
                                    return 'Selecione a quantidade de aulas';
                                  }

                                  return null;
                                },
                                onChanged: (int? value) {
                                  if (value == null) {
                                    return;
                                  }
                                  setState(() {
                                    _selectedClassOption = _price!.options
                                        .firstWhere((option) =>
                                            option.duration == value);
                                  });
                                },
                                items: _price!.options
                                    .map((option) => DropdownMenuItem(
                                        value: option.duration,
                                        child: Text(option.label)))
                                    .toList(),
                                decoration: const InputDecoration(
                                  labelText: "Escolha a quantidade de aulas",
                                  border: OutlineInputBorder(),
                                ),
                              ),
                            )
                          : Container(),
                      Padding(
                        padding: const EdgeInsets.only(top: 16, bottom: 16),
                        child: DatePickerInput(
                          label: 'Data da aula',
                          date: _selectedDateTime,
                          onChange: (DateTime date) {
                            setState(() {
                              _selectedDateTime = date;
                            });
                          },
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.only(bottom: 16),
                        child: TimePickerInput(
                          label: 'Hora da aula',
                          date: _selectedDateTime,
                          onChange: (DateTime date) {
                            setState(() {
                              _selectedDateTime = date;
                            });
                          },
                        ),
                      ),
                      _selectedClassOption != null
                          ? Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Padding(
                                  padding: const EdgeInsets.only(bottom: 8.0),
                                  child: DataLabel(
                                    label: 'Duração',
                                    info: _selectedClassOption!.getDuration(),
                                  ),
                                ),
                                Padding(
                                  padding: const EdgeInsets.only(bottom: 8.0),
                                  child: DataLabel(
                                    label: 'Valor aula',
                                    info: _selectedClassOption!.getAmount(),
                                  ),
                                ),
                                Padding(
                                  padding: const EdgeInsets.only(bottom: 8.0),
                                  child: DataLabel(
                                    label: 'Taxa de deslocamento',
                                    info: _price!.tax > 0
                                        ? _price!.getTax()
                                        : 'Grátis',
                                  ),
                                ),
                                Padding(
                                  padding: const EdgeInsets.only(bottom: 8.0),
                                  child: DataLabel(
                                    label: 'Total',
                                    info:
                                        _selectedClassOption!.getTotalAmount(),
                                  ),
                                ),
                              ],
                            )
                          : Container(),
                    ],
                  ),
                ),
              ),
      ),
    );
  }
}
