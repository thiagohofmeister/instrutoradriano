class StudentCreate {
  String name;
  String phone;
  StudentAddressCreate address;

  StudentCreate(
      {required this.name, required this.phone, required this.address});

  Map<String, dynamic> toMap() {
    return {
      'name': name,
      'phone': phone,
      'address': address.toMap(),
    };
  }
}

class StudentAddressCreate {
  String zipCode;
  String number;

  StudentAddressCreate({required this.zipCode, required this.number});

  Map<String, dynamic> toMap() {
    return {
      'zipCode': zipCode,
      'number': number,
    };
  }
}
