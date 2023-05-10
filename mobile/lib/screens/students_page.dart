import 'package:flutter/material.dart';
import 'package:mobile/models/student.dart';

class StudentsPage extends StatefulWidget {
  const StudentsPage({Key? key}) : super(key: key);

  @override
  State<StudentsPage> createState() => _StudentsPageState();
}

class _StudentsPageState extends State<StudentsPage> {
  final TextEditingController _searchController = TextEditingController();
  final GlobalKey<RefreshIndicatorState> _refreshIndicatorKey =
      GlobalKey<RefreshIndicatorState>();
  List<Student> _students = [];

  Future<void> _refresh() async {
    await Future.delayed(const Duration(seconds: 2));
    setState(() {
      _searchController.clear();
      _students = students;
    });
  }

  @override
  void initState() {
    super.initState();
    _searchController.addListener(_onSearchChanged);
    _students = students;
  }

  void _onSearchChanged() {
    setState(() {
      String query = _searchController.text.toLowerCase();
      _students = students
          .where((student) => student.name.toLowerCase().contains(query))
          .toList();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
          title: TextField(
        controller: _searchController,
        decoration: const InputDecoration(hintText: "Pesquisar alunos"),
      )),
      body: RefreshIndicator(
        key: _refreshIndicatorKey,
        onRefresh: _refresh,
        child: ListView.builder(
            itemCount: _students.length,
            itemBuilder: (context, index) {
              return ListTile(
                  title: Text(_students[index].name),
                  subtitle: Text(_students[index].phone));
            }),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {},
        child: const Icon(Icons.add),
      ),
    );
  }
}
