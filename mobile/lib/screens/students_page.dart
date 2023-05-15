import 'package:flutter/material.dart';
import 'package:mobile/components/student_item.dart';
import 'package:mobile/components/template/nav_drawer.dart';
import 'package:mobile/store/student_store.dart';
import 'package:provider/provider.dart';

class StudentsPage extends StatefulWidget {
  const StudentsPage({Key? key}) : super(key: key);

  @override
  State<StudentsPage> createState() => _StudentsPageState();
}

class _StudentsPageState extends State<StudentsPage> {
  final GlobalKey<RefreshIndicatorState> _refreshIndicatorKey =
      GlobalKey<RefreshIndicatorState>();
  Future<void> _fetch({bool isRefetch = true}) async {
    final dataProvider = Provider.of<StudentStore>(context, listen: false);
    if (isRefetch) {
      dataProvider.refetch();
      return;
    }

    if (dataProvider.items.isEmpty) {
      dataProvider.initialFetch();
    }
  }

  @override
  void initState() {
    super.initState();
    _fetch(isRefetch: false);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Meus alunos'),
      ),
      drawer: const NavDrawer(),
      body: Consumer<StudentStore>(
        builder: (context, store, child) {
          if (store.isLoading) {
            return const Center(
              child: CircularProgressIndicator(),
            );
          }

          if (store.hasNoData()) {
            return const Center(
              child: Text('Você não possui nenhum aluno.'),
            );
          }

          return RefreshIndicator(
            key: _refreshIndicatorKey,
            onRefresh: _fetch,
            child: CustomScrollView(
              slivers: [
                SliverList(
                  delegate: SliverChildBuilderDelegate(
                    (context, index) =>
                        StudentItem(student: store.items[index]),
                    childCount: store.items.length,
                  ),
                ),
              ],
            ),
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.pushNamed(context, 'create_student').then((_) {
            _fetch();
          });
        },
        child: const Icon(Icons.add),
      ),
    );
  }
}
