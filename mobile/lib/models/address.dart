class Address {
  String zipCode;
  String street;
  String number;
  String? complement;
  int distance;
  int distanceDuration;

  Address({
    required this.zipCode,
    required this.street,
    required this.number,
    this.complement,
    required this.distance,
    required this.distanceDuration,
  });
}
