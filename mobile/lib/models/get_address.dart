class GetAddress {
  String uf;
  String city;
  String street;

  GetAddress({required this.uf, required this.city, required this.street});

  Map<String, dynamic> toMap() {
    return {
      'uf': uf,
      'city': city,
      'street': street,
    };
  }
}
