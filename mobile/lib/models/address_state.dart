class AddressState {
  String uf;
  List<String> cities;

  AddressState({required this.uf, required this.cities});

  AddressState.fromMap(Map<String, dynamic> json)
      : uf = json['uf'],
        cities = List.from(json['cities']);

  Map<String, dynamic> toMap() {
    return {
      'uf': uf,
      'cities': cities,
    };
  }

  static List<AddressState> fromMapList(List<dynamic> list) {
    return list.map((item) => AddressState.fromMap(item)).toList();
  }
}
