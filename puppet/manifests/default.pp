# Default paths
Exec {
    path => ["/usr/bin", "/bin", "/usr/sbin", "/sbin", "/usr/local/bin", "/usr/local/sbin"]
}

# Ensure local apt cache index is up to date before beginning
exec { "package-manager-update":
    command => 'apt-get update'
}

include mongodb
include nodejs
