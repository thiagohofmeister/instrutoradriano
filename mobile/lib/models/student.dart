import 'package:mobile/models/abstract_model.dart';
import 'package:mobile/models/address.dart';

class Student extends Model {
  String id;
  String name;
  String phone;
  Address address;

  Student({
    required this.id,
    required this.name,
    required this.phone,
    required this.address,
  }) : super();

  Student.fromMap(Map<String, dynamic> json)
      : id = json['id'],
        name = json['name'],
        phone = json['phone'],
        address = Address.fromMap(json['address']);

  Map<String, dynamic> toMap() {
    return {'id': id, 'name': name, 'phone': phone, 'address': address.toMap()};
  }
}

List<Student> students = [
  Student(
    id: "123",
    name: "Thiago",
    phone: "51994017101",
    address: Address(
      distance: 5,
      distanceDuration: 5,
      city: "Porto Alegre",
      number: "31",
      street: "Rua Catão Roxo",
      zipCode: "91040180",
    ),
  )
];
