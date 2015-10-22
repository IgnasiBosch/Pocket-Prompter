class mongodb
{

  exec { "mongodb-import-public-key":
    require => Exec['package-manager-update'],
    command => "apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10",
    creates => "/usr/bin/mongod"
  }

  exec { "mongodb-create-list-file":
    require => Exec["mongodb-import-public-key"],
    command => 'echo "deb http://repo.mongodb.org/apt/ubuntu "$(lsb_release -sc)"/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list',
    creates => "/usr/bin/mongod"
  }

  exec { "mongodb-install":
    onlyif => "apt-get update",
    command => "sudo apt-get install -y mongodb-org",
    creates => "/usr/bin/mongod",
    timeout => 0
  }

  service { "mongod":
    require => Exec["mongodb-install"],
    ensure => running
  }

}