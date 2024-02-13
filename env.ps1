# Check if a file path is provided as the first command-line argument
if ($args.Count -ge 1) {
    $envFilePath = $args[0]
} else {
    Write-Host "Usage: .\env.ps1 <env_file_path>"
    Exit
}

# Check if the specified file exists
if (-not (Test-Path $envFilePath)) {
    Write-Warning "File not found at path: $envFilePath"
    Exit
}

# Read the content of the .env file
$envContent = Get-Content $envFilePath

# Iterate through each line in the .env file
foreach ($line in $envContent) {
    # Check if the line is not empty and does not start with a comment character '#'
    if (-not [string]::IsNullOrWhiteSpace($line) -and -not $line.StartsWith("#")) {
        # Split the line by the first '=' to separate key and value
        $splitIndex = $line.IndexOf('=')
        if ($splitIndex -ne -1) {
            $key = $line.Substring(0, $splitIndex).Trim()
            $value = $line.Substring($splitIndex + 1).Trim()
            
            # Set the environment variable for the current process
            [Environment]::SetEnvironmentVariable($key, $value, "Process")
        } else {
            Write-Warning "Invalid line format: $line"
        }
    }
}
