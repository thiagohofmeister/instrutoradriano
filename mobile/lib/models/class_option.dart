import 'package:mobile/utils/parse_utils.dart';

class ClassOption {
  String label;
  int duration;
  double amount;
  double totalAmount;

  ClassOption({
    required this.label,
    required this.duration,
    required this.amount,
    required this.totalAmount,
  });

  ClassOption.fromMap(Map<String, dynamic> json)
      : label = json['label'],
        duration = json['duration'],
        amount = double.parse(json['amount'].toString()),
        totalAmount = double.parse(json['totalAmount'].toString());

  static List<ClassOption> fromList(List<dynamic> list) {
    return list.map((item) => ClassOption.fromMap(item)).toList();
  }

  String getDuration() {
    return ParseUtils.minutesToTime(duration);
  }

  String getAmount() {
    return ParseUtils.toMoney(amount);
  }

  String getTotalAmount() {
    return ParseUtils.toMoney(totalAmount);
  }
}
