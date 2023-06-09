import 'package:http/http.dart' as http;
import 'package:http_interceptor/http/http.dart';

class ServiceContract {
  http.Client httpClient = InterceptedClient.build(
    interceptors: [],
  );

  String getBaseUrl() {
    return 'https://instrutoradriano.fly.dev';
  }

  Uri getUri({
    required String resource,
    String? endpoint,
    Map<String, String>? params,
  }) {
    List<String> queryParams = [];

    params?.forEach((key, value) => queryParams.add('$key=$value'));

    String query = queryParams.join('&');

    return Uri.parse(
        '${getBaseUrl()}/$resource${endpoint != null ? '/$endpoint' : ''}${query.isNotEmpty ? '?$query' : ''}');
  }
}
