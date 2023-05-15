import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:mobile/models/get_address.dart';
import 'package:mobile/models/zipcode.dart';
import 'package:mobile/services/service_contract.dart';

import '../models/address_state.dart';

class ZipcodeService extends ServiceContract {
  final String resource = 'zip-code';

  ZipcodeService() : super();

  Future<List<AddressState>> getStates() async {
    http.Response response = await super
        .httpClient
        .get(getUri(resource: resource, endpoint: 'states'));

    return AddressState.fromMapList(jsonDecode(response.body));
  }

  Future<List<Zipcode>> getZipcodeByAddress(GetAddress getAddress) async {
    http.Response response = await super.httpClient.post(
          getUri(resource: resource, endpoint: 'address'),
          headers: {'Content-Type': 'application/json'},
          body: jsonEncode(getAddress.toMap()),
        );

    if (response.statusCode != 200) {
      throw Exception();
    }

    return Zipcode.fromMapList(jsonDecode(response.body));
  }
}
