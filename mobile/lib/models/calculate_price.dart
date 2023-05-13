import 'package:mobile/models/class_option.dart';
import 'package:mobile/utils/parse_utils.dart';

class CalculatePrice {
  int distance;
  int distanceDuration;
  double tax;
  List<ClassOption> options;

  CalculatePrice({
    required this.distance,
    required this.distanceDuration,
    required this.tax,
    required this.options,
  });

  CalculatePrice.fromMap(Map<String, dynamic> json)
      : distance = json['distance'],
        distanceDuration = json['distanceDuration'],
        tax = double.parse(json['tax'].toString()),
        options = ClassOption.fromList(json['options']);

  String getDistance() {
    return ParseUtils.toStringDistance(distance);
  }

  String getDistanceDuration() {
    return ParseUtils.secondsToTime(distanceDuration);
  }

  String getTax() {
    return ParseUtils.toMoney(tax);
  }
}
