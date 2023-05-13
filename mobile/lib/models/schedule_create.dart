class ScheduleCreate {
  String studentId;
  DateTime classInitialDate;
  int duration;

  ScheduleCreate({
    required this.studentId,
    required this.classInitialDate,
    required this.duration,
  });

  Map<String, dynamic> toMap() {
    return {
      'studentId': studentId,
      'classInitialDate': classInitialDate.toString(),
      'duration': duration,
    };
  }
}
