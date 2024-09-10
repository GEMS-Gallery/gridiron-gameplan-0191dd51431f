import Text "mo:base/Text";
import Result "mo:base/Result";
import Debug "mo:base/Debug";

actor {
  public type SeasonInfo = {
    year: Text;
    startDate: ?Text;
    endDate: ?Text;
  };

  stable var seasonInfo: SeasonInfo = {
    year = "2024-2025";
    startDate = null;
    endDate = null;
  };

  public query func getSeasonInfo(): async SeasonInfo {
    seasonInfo
  };

  public func updateSeasonInfo(info: SeasonInfo): async Result.Result<(), Text> {
    seasonInfo := info;
    #ok(())
  };
}
