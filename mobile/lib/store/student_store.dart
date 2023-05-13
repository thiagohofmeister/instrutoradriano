import 'package:mobile/models/response_list.dart';
import 'package:mobile/models/student.dart';
import 'package:mobile/services/student_service.dart';
import 'package:mobile/store/list_store_contract.dart';

class StudentStore extends ListStoreContract<Student> {
  StudentStore() : super();

  @override
  Future<ResponseList<Student>> getAll({Map<String, String>? params}) {
    return StudentService().getAll(params);
  }
}
