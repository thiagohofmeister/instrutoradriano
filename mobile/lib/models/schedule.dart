class Schedule {
  final String studentName;

  const Schedule({
    required this.studentName,
  });

  factory Schedule.fromJson(Map<dynamic, dynamic> json) {
    return Schedule(studentName: json['student']['name']);
  }
}
