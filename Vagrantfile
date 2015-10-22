# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.require_version ">= 1.6.0"
Vagrant.configure('2') do |config|

  config.vm.box = 'ubuntu/trusty64'
  config.vm.network 'private_network', ip: '10.0.0.105'
  config.vm.hostname = "glossary.vm"

  config.vm.provider :virtualbox do |vb|
    vb.name = 'PocketPrompter'
    vb.gui = false
    vb.memory = 1024
    vb.cpus = 1
  end

  config.vm.provision :puppet do |puppet|
    puppet.manifests_path = 'puppet/manifests'
    puppet.manifest_file = 'default.pp'
    puppet.module_path = 'puppet/modules'

    puppet.options = [
        '--verbose',
        '--debug'
    ]
  end
end
