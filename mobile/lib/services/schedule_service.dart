import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:mobile/models/calculate_price.dart';
import 'package:mobile/models/response_list.dart';
import 'package:mobile/models/schedule.dart';
import 'package:mobile/models/schedule_create.dart';
import 'package:mobile/services/service_contract.dart';

class ScheduleService extends ServiceContract {
  ScheduleService() : super();

  static const String resource = 'schedule';

  Future<ResponseList<Schedule>> getAll(Map<String, String>? params) async {
    http.Response response =
        await super.httpClient.get(getUri(resource: resource, params: params));

    if (response.statusCode != 200) {
      throw Exception();
    }

    List<Schedule> result = [];

    List<dynamic> jsonList = jsonDecode(response.body)['items'];
    for (var jsonMap in jsonList) {
      result.add(Schedule.fromMap(jsonMap));
    }

    return ResponseList<Schedule>(
      items: result,
      total: jsonDecode(response.body)['total'],
    );
  }

  Future<CalculatePrice> getCalculatePrice(String studentId) async {
    http.Response response = await super.httpClient.get(
        getUri(resource: resource, endpoint: 'calculate-price/$studentId'));

    if (response.statusCode != 200) {
      throw Exception();
    }

    return CalculatePrice.fromMap(jsonDecode(response.body));
  }

  Future<Schedule> create({
    required ScheduleCreate scheduleCreate,
  }) async {
    http.Response response = await super.httpClient.post(
          getUri(resource: resource),
          headers: {'Content-Type': 'application/json'},
          body: jsonEncode(
            scheduleCreate.toMap(),
          ),
        );

    if (response.statusCode != 201) {
      throw Exception();
    }

    return Schedule.fromMap(jsonDecode(response.body));
  }
}
