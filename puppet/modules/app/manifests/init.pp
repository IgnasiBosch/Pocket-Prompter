class app
{

  # Run server
  exec { "app-run-server":
    require => [Service["mongod"], Exec["app-npm-install"]],
    command => "/vagrant/run_server.sh",
    timeout => 0
  }

}