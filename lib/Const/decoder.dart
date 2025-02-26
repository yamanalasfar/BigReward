import 'dart:convert';

class DataDeCryp {
  static String encodeString(String input) {
    return base64.encode(utf8.encode(input));
  }

  static int saltKey() {
    String sKey = "PyV1ZfWeaxQw";
    int count = 0;
    for (int i = 0; i < sKey.length; i++) {
      count += sKey.codeUnitAt(i);
    }
    return count;
  }

  static String dec(String encodedStr) {
    String decodedStr = "";
    List<String> parts = encodedStr.split("x");
    int salt = saltKey();
    int padding = 0;
    for (String part in parts) {
      int value = int.parse(part) - salt - padding;
      decodedStr += String.fromCharCode(value);
      padding += 1;
    }
    return decodedStr;
  }

  static String enc(String str) {
    String data = "";
    int padding = 0;
    int salt = saltKey();
    for (int i = 0; i < str.length; i++) {
      data += '${str.codeUnitAt(i) + salt + padding}x';
      padding += 1;
    }
    return data.substring(0, data.length - 1);
  }
}
