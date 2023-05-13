import 'package:mobile/models/student.dart';

import '../utils/parse_utils.dart';

class Schedule {
  String id;
  DateTime classInitialDate;
  DateTime classFinalDate;
  DateTime reservationInitialDate;
  DateTime reservationFinalDate;
  double tax;
  double amount;
  int duration;
  Student student;

  Schedule({
    required this.id,
    required this.classInitialDate,
    required this.classFinalDate,
    required this.reservationInitialDate,
    required this.reservationFinalDate,
    required this.tax,
    required this.amount,
    required this.duration,
    required this.student,
  });

  Schedule.fromMap(Map<String, dynamic> json)
      : id = json['id'],
        classInitialDate = DateTime.parse(json['classInitialDate']),
        classFinalDate = DateTime.parse(json['classFinalDate']),
        reservationInitialDate = DateTime.parse(json['reservationInitialDate']),
        reservationFinalDate = DateTime.parse(json['reservationFinalDate']),
        tax = double.parse(json['tax'].toString()),
        amount = double.parse(json['amount'].toString()),
        duration = json['duration'],
        student = Student.fromMap(json['student']);

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'classInitialDate': classInitialDate.toString(),
      'classFinalDate': classFinalDate.toString(),
      'reservationInitialDate': reservationInitialDate.toString(),
      'reservationFinalDate': reservationFinalDate.toString(),
      'tax': tax,
      'amount': amount,
      'duration': duration,
      'student': student,
    };
  }

  String getAmount() {
    return ParseUtils.toMoney(amount);
  }

  String getTax() {
    return ParseUtils.toMoney(tax);
  }

  String getInitialDate() {
    return ParseUtils.toStringDate(classInitialDate);
  }

  String getFinalDate() {
    return ParseUtils.toStringDate(classFinalDate);
  }

  String getReservationInitialDate() {
    return ParseUtils.toStringDate(reservationInitialDate);
  }

  String getReservationFinalDate() {
    return ParseUtils.toStringDate(reservationFinalDate);
  }

  String getDuration() {
    return ParseUtils.minutesToTime(duration);
  }
}
