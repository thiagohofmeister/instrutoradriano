import 'package:mobile/models/response_list.dart';
import 'package:mobile/services/schedule_service.dart';
import 'package:mobile/store/list_store_contract.dart';

class ScheduleStore extends ListStoreContract {
  ScheduleStore() : super();

  @override
  Future<ResponseList> getAll({Map<String, String>? params}) {
    return ScheduleService().getAll(params);
  }
}
