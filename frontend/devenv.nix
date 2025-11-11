{
  config,
  lib,
  pkgs,
  ...
}:
{
  packages = with pkgs; [
    chromium
  ];
  process.managers.process-compose = {
    # Only one processes, so having the TUI would use unnecessary space
    tui.enable = false;
  };
  enterShell = ''
    alias ng='yarn ng'
    ng analytics disable
  '';

  languages.javascript = {
    enable = true;
    yarn = {
      enable = true;
      install.enable = true;
    };
  };

  processes =
    { }
    // lib.optionalAttrs (!config.devenv.isTesting) {
      start.exec = "ng serve";
    };

  tasks = {
    "frontend:build".exec = "ng build";
    "frontend:lint".exec = "ng lint";
    "frontend:lint-fix".exec = "ng lint --fix";
  };

  enterTest = ''
    CHROME_BIN=${pkgs.chromium}/bin/chromium yarn ng test --watch=false --browsers=ChromeHeadless
  '';

}
