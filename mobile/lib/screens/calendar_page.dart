import 'package:flutter/material.dart';
import 'package:mobile/components/schedule_item.dart';
import 'package:mobile/components/template/nav_drawer.dart';
import 'package:mobile/store/schedule_store.dart';
import 'package:provider/provider.dart';

class CalendarPage extends StatefulWidget {
  const CalendarPage({Key? key}) : super(key: key);

  @override
  State<CalendarPage> createState() => _CalendarPageState();
}

class _CalendarPageState extends State<CalendarPage> {
  int _currentPeriodity = 0;

  final GlobalKey<RefreshIndicatorState> _refreshIndicatorKey =
      GlobalKey<RefreshIndicatorState>();

  final List<String> _periodities = ['TODAY', 'TOMORROW', 'WEEK', 'MONTH'];

  Future<void> _fetch({bool isRefetch = true}) async {
    final dataProvider = Provider.of<ScheduleStore>(context, listen: false);
    Map<String, String> params = {'periodity': _periodities[_currentPeriodity]};

    if (isRefetch) {
      dataProvider.refetch(params: params);
      return;
    }

    dataProvider.initialFetch(params: params);
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
        title: const Text('Minha agenda'),
        actions: [
          IconButton(onPressed: _fetch, icon: const Icon(Icons.refresh)),
        ],
      ),
      drawer: const NavDrawer(),
      bottomNavigationBar: BottomNavigationBar(
        type: BottomNavigationBarType.fixed,
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.today),
            label: 'Hoje',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.today),
            label: 'Amanhã',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.today),
            label: 'Semana',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.today),
            label: 'Mês',
          ),
        ],
        currentIndex: _currentPeriodity,
        onTap: (index) {
          setState(() {
            _currentPeriodity = index;

            _fetch();
          });
        },
      ),
      body: Consumer<ScheduleStore>(
        builder: (context, store, child) {
          if (store.isLoading) {
            return const Center(
              child: CircularProgressIndicator(),
            );
          }

          if (store.hasNoData()) {
            return const Center(
              child: Text('Você não possui nenhuma aula para esse período.'),
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
                        ScheduleItem(schedule: store.items[index]),
                    childCount: store.items.length,
                  ),
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}
