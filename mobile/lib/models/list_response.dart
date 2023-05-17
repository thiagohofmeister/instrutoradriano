import 'package:mobile/models/abstract_model.dart';

class ListResponse<T extends Model> {
  final List<T> items;
  final int total;

  const ListResponse({required this.items, required this.total});

  factory ListResponse.fromJson(Map<dynamic, dynamic> json) {
    return ListResponse(
      items: json['items'] as List<T>,
      total: json['total'],
    );
  }
}
