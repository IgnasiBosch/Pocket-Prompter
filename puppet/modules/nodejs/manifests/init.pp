class nodejs
{

  # Install nodejs
  package { 'nodejs':
    ensure  => present,
    require => Exec['package-manager-update']
  }

  # Install nodejs-legacy
  package { 'nodejs-legacy':
    require => Package['nodejs'],
  }

  # Install npm
  package { 'npm':
    require => Package['nodejs'],
    ensure  => present
  }

}