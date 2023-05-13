import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:mobile/models/response_list.dart';
import 'package:mobile/models/student.dart';
import 'package:mobile/services/service_contract.dart';

class StudentService extends ServiceContract {
  StudentService() : super();

  static const String resource = 'student';

  Future<ResponseList<Student>> getAll(Map<String, String>? params) async {
    http.Response response =
        await super.httpClient.get(getUri(resource: resource, params: params));

    if (response.statusCode != 200) {
      throw Exception();
    }

    List<Student> result = [];

    List<dynamic> jsonList = jsonDecode(response.body)['items'];
    for (var jsonMap in jsonList) {
      result.add(Student.fromMap(jsonMap));
    }

    return ResponseList<Student>(
      items: result,
      total: jsonDecode(response.body)['total'],
    );
  }
}
