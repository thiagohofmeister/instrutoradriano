import 'package:mobile/utils/parse_utils.dart';

class Address {
  String zipCode;
  String street;
  String city;
  String number;
  String? complement;
  int distance;
  int distanceDuration;

  Address({
    required this.zipCode,
    required this.street,
    required this.city,
    required this.number,
    this.complement,
    required this.distance,
    required this.distanceDuration,
  });

  Address.fromMap(Map<String, dynamic> json)
      : zipCode = json['zipCode'],
        street = json['street'],
        city = json['city'],
        number = json['number'],
        complement = json['complement'],
        distance = json['distance'],
        distanceDuration = json['distanceDuration'];

  Map<String, dynamic> toMap() {
    return {
      'zipCode': zipCode,
      'street': street,
      'city': city,
      'number': number,
      'complement': complement,
      'distance': distance,
      'distanceDuration': distanceDuration
    };
  }

  String getFullAddress() {
    String comp =
        complement != null && complement!.isNotEmpty ? ' - $complement' : '';
    return '$street, $number$comp - $city, $zipCode';
  }

  String getDistance() {
    return ParseUtils.toStringDistance(distance);
  }

  String getDistanceDuration() {
    return ParseUtils.secondsToTime(distanceDuration);
  }
}
