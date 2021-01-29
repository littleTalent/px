export function getConfData() {
  var confs = [];
  for (let i = 1; i <= 10; i++) {
    for (let j = 1; j <= 10; j++) {
      var conf = {
        vlan: (j % 3 == 1 ? 10 : 20),
        type: "IP地址",
        ip: "192.168." + i + "." + j,
        mask: (j % 3 == 2 ? "255.255.255.192" : "255.255.255.0"),
        mac: "11:11:11:11:" + i + i + ":" + (j >= 10 ? j : ("0" + j)),
        remark: "备注" + i + j,
      };
      confs.push(conf);
    }
  }
  return confs;
};

export function getServerData() {
  var confs = [];
  for (let i = 1; i <= 3; i++) {
    for (let j = 1; j <= 2; j++) {
      var conf = {
        name: "JIRA TEST" + i + j,
        ip: "192.168.1." + i + j,
        linked: (j == 1 ? false : true),
        opened: (j == 2 ? false : true),
      };
      confs.push(conf);
    }
  }
  return confs;
};

export function getVisitorData() {
  var confs = [];
  for (let i = 1; i <= 4; i++) {
    for (let j = 1; j <= 2; j++) {
      var conf = {
        name: "JIRA TEST" + i + j,
        remark: "备注" + i + j,
        status: (j == 1 ? false : true),
      };
      confs.push(conf);
    }
  }
  return confs;
};

export function getVisitRangeData() {
  var confs = [];
  for (let i = 1; i <= 3; i++) {
    for (let j = 1; j <= 2; j++) {
      var conf = {
        opened: (j == 1 ? false : true),
        ip: "192.168." + i + "." + j + " ~ " + "192.168." + i + "." + (j + 1),
        action: (j == 1 ? '禁止' : '允许'),
        remark: "备注" + i + j,
      };
      confs.push(conf);
    }
  }
  return confs;
};

export function getVisitLogData() {
  var confs = [];
  for (let i = 1; i <= 10; i++) {
    for (let j = 1; j <= 10; j++) {
      var conf = {
        time: "2020-11-11 11:11:11",
        ip: "192.168." + i + "." + j,
        type: (j % 2 == 0 ? '账号验证' : '短信验证'),
        account: "account" + i + j,
        action: (j % 3 == 0 ? '登录' : '注销'),
      };
      confs.push(conf);
    }
  }
  return confs;
};

export function getIPInfoData() {
  var confs = [];
  for (let i = 1; i <= 10; i++) {
    for (let j = 1; j <= 10; j++) {
      var conf = {
        ip: "192.168." + i + "." + j,
        startTime: "2020-11-11 11:11:11",
        blockeded: (j % 3 == 0 ? '阻断' : ''),
        nowMark: (j % 3 == 1 ? '合规（授权+信任）' : ''),
      };
      confs.push(conf);
    }
  }
  return confs;
};

export function getSysLogData() {
  var confs = [];
  for (let i = 1; i <= 10; i++) {
    for (let j = 1; j <= 10; j++) {
      var conf = {
        time: "2020-11-11 11:11:11",
        ip: "192.168." + i + "." + j,
        type: (j % 2 == 0 ? '定时重启' : '修改密码'),
        account: "account" + i + j,
        action: (j % 3 == 0 ? '设备重启' : '导出配置'),
      };
      confs.push(conf);
    }
  }
  return confs;
};
