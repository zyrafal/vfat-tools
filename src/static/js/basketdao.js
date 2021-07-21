$(function() {
  consoleInit(main)
    });
  
    async function main() {
      const App = await init_ethers();

      const BASK_STAKING_ABI = [{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"address","name":"_rewardsToken","type":"address"},{"internalType":"address","name":"_stakingToken","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Recovered","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"RewardPaid","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newDuration","type":"uint256"}],"name":"RewardsDurationUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"exit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getRewardForDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastTimeRewardApplicable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"reward","type":"uint256"}],"name":"notifyRewardAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"periodFinish","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"tokenAmount","type":"uint256"}],"name":"recoverERC20","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerTokenStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardsDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardsToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bool","name":"_p","type":"bool"}],"name":"setPaused","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rewardsDuration","type":"uint256"}],"name":"setRewardsDuration","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"stake","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stakingToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userRewardPerTokenPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]

      const Pool = {
        address : "0x1AF13aba9F1b269678bAf61Da7Ff419ae0F8439A",
        abi : BASK_STAKING_ABI,
        stakeTokenFunction : "stakingToken",
        rewardTokenFunction : "rewardsToken"
      }
  
      _print(`Initialized ${App.YOUR_ADDRESS}\n`);
      _print("Reading smart contracts...\n");
  
      let tokens = {};
      let prices = {};

      const BASK_CHEF_ADDR0 = "0x9f51fFfd1bCe00E31159B1345b9DEb7d3c7A2cD7";
      const BASK_CHEF_ABI = [{"inputs":[{"internalType":"address","name":"_timelock","type":"address"},{"internalType":"contract IERC20","name":"_stakingToken","type":"address"},{"internalType":"contract IERC20","name":"_mintableToken","type":"address"},{"internalType":"uint256","name":"_sushiPID","type":"uint256"},{"internalType":"uint256","name":"_baskPID","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[],"name":"baskPID","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baskToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"target","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"string","name":"signature","type":"string"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"emergencyExecute","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"mintableToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"pendingBaskRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"pendingRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"pendingSushiRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"poolInfo","outputs":[{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accRewardsPerShare","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"stakingToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sushiPID","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sushiToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"timelock","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"updatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"sushiRewardDebt","type":"uint256"},{"internalType":"uint256","name":"basketRewardDebt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
      const BASK_CHEF0 = new ethers.Contract(BASK_CHEF_ADDR0, BASK_CHEF_ABI, App.provider);
      await loadBaskChefContract(App, BASK_CHEF0, BASK_CHEF_ADDR0, BASK_CHEF_ABI,
        "BASK", "SUSHI", "baskToken", "sushiToken", "pendingBaskRewards", "pendingSushiRewards");

      let p0 = await loadSynthetixPool(App, tokens, prices, Pool.abi, Pool.address, Pool.rewardTokenFunction, Pool.stakeTokenFunction);
      _print_bold(`Total staked: $${formatMoney(p0.staked_tvl)}`);
      if (p0.totalUserStaked > 0) {
        _print(`You are staking a total of $${formatMoney(p0.totalUserStaked)} at an APR of ${(p0.totalAPR * 100).toFixed(2)}%\n`);
      }
  
      await loadXBasket(App, tokens, prices);
  
      hideLoading();
    }

async function loadBaskChefContract(App, chef, chefAddress, chefAbi, rewardTokenTicker0, rewardTokenTicker1,
    rewardTokenFunction0, rewardTokenFunction1, pendingRewardsFunction0, pendingRewardsFunction1,
    extraPrices, showAll) {
  const chefContract = chef ?? new ethers.Contract(chefAddress, chefAbi, App.provider);

  var tokens = {};

  const rewardBaskTokenAddress = await chefContract.callStatic[rewardTokenFunction0]();
  const rewardSushiTokenAddress = await chefContract.callStatic[rewardTokenFunction1]();
  const rewardBaskToken = await getToken(App, rewardBaskTokenAddress, chefAddress);
  const rewardSushiToken = await getToken(App, rewardSushiTokenAddress, chefAddress);

  const basketdaoMasterChefAddress = "0xDB9daa0a50B33e4fe9d0ac16a1Df1d335F96595e"
  const basketdaoMasterChefAbi = [{"inputs":[{"internalType":"contract ERC20","name":"_basket","type":"address"},{"internalType":"address","name":"_timelock","type":"address"},{"internalType":"address","name":"_devaddr","type":"address"},{"internalType":"address","name":"_treasuryaddr","type":"address"},{"internalType":"uint256","name":"_basketPerBlock","type":"uint256"},{"internalType":"uint256","name":"_startBlock","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"token","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Recovered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"contract IERC20","name":"_lpToken","type":"address"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"basket","outputs":[{"internalType":"contract ERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"basketPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"devFundRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"devaddr","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"divRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"}],"name":"getMultiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"migrate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"migrator","outputs":[{"internalType":"contract IMigrator","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingBasket","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contract IERC20","name":"lpToken","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accBasketPerShare","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_basketPerBlock","type":"uint256"}],"name":"setBasketPerBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_devaddr","type":"address"}],"name":"setDev","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IMigrator","name":"_migrator","type":"address"}],"name":"setMigrator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_startBlock","type":"uint256"}],"name":"setStartBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_treasury","type":"address"}],"name":"setTreasury","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"treasuryRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"treasuryaddr","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
  const basketdaoMasterChef = new ethers.Contract(basketdaoMasterChefAddress, basketdaoMasterChefAbi, App.provider);

  const baskPidID = await chef.baskPID();
  const poolBaskInfo = await basketdaoMasterChef.poolInfo(baskPidID)
  const totalBaskAllocPoints = await basketdaoMasterChef.totalAllocPoint();

  const sushiMasterChefAddress = "0xc2EdaD668740f1aA35E4D8f227fB8E17dcA888Cd"
  const sushiMasterChefAbi = [{"inputs":[{"internalType":"contract SushiToken","name":"_sushi","type":"address"},{"internalType":"address","name":"_devaddr","type":"address"},{"internalType":"uint256","name":"_sushiPerBlock","type":"uint256"},{"internalType":"uint256","name":"_startBlock","type":"uint256"},{"internalType":"uint256","name":"_bonusEndBlock","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"EmergencyWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"uint256","name":"pid","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"BONUS_MULTIPLIER","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"contract IERC20","name":"_lpToken","type":"address"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"add","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"bonusEndBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_devaddr","type":"address"}],"name":"dev","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"devaddr","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"emergencyWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_from","type":"uint256"},{"internalType":"uint256","name":"_to","type":"uint256"}],"name":"getMultiplier","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"massUpdatePools","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"migrate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"migrator","outputs":[{"internalType":"contract IMigratorChef","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"pendingSushi","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"poolInfo","outputs":[{"internalType":"contract IERC20","name":"lpToken","type":"address"},{"internalType":"uint256","name":"allocPoint","type":"uint256"},{"internalType":"uint256","name":"lastRewardBlock","type":"uint256"},{"internalType":"uint256","name":"accSushiPerShare","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"poolLength","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_allocPoint","type":"uint256"},{"internalType":"bool","name":"_withUpdate","type":"bool"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IMigratorChef","name":"_migrator","type":"address"}],"name":"setMigrator","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sushi","outputs":[{"internalType":"contract SushiToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sushiPerBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalAllocPoint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"}],"name":"updatePool","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"}],"name":"userInfo","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_pid","type":"uint256"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
  const sushiMasterChef = new ethers.Contract(sushiMasterChefAddress, sushiMasterChefAbi, App.provider);

  const sushiPidID = await chef.sushiPID();
  const poolSushiInfo = await sushiMasterChef.poolInfo(sushiPidID)
  const totalSushiAllocPoints = await sushiMasterChef.totalAllocPoint();

  const baskRewardsPerWeek0 = await basketdaoMasterChef.basketPerBlock()
        / 10 ** rewardBaskToken.decimals * 604800 / 13.5
  const baskRewardsPerWeek = poolBaskInfo.allocPoint / totalBaskAllocPoints * baskRewardsPerWeek0;
  const sushiRewardsPerWeek0 = await sushiMasterChef.sushiPerBlock()
        / 10 ** rewardSushiToken.decimals * 604800 / 13.5
  const sushiRewardsPerWeek = poolSushiInfo.allocPoint / totalSushiAllocPoints * sushiRewardsPerWeek0;

        //poolInfo.allocPoints / totalAllocPoints * rewardsPerWeek; I have to make this
  const pendingBaskTokens = await chefContract.callStatic[pendingRewardsFunction0](App.YOUR_ADDRESS) / 10 ** rewardBaskToken.decimals;
  const pendingSushiTokens = await chefContract.callStatic[pendingRewardsFunction1](App.YOUR_ADDRESS) / 10 ** rewardSushiToken.decimals;

  const stakingTokenAddress = await chefContract.stakingToken();
  const poolToken = await getToken(App, stakingTokenAddress, chefAddress);

  const userInfo = await chefContract.userInfo(App.YOUR_ADDRESS);
  const staked = userInfo.amount / 10 ** poolToken.decimals;

  var tokenAddresses = [].concat.apply([], poolToken.tokens);
  var prices = await lookUpTokenPrices(tokenAddresses);
  if (extraPrices) {
    for (const [k,v] of Object.entries(extraPrices)) {
      if (v.usd) {
        prices[k] = v
      }
    }
  }

  await Promise.all(tokenAddresses.map(async (address) => {
      tokens[address] = await getToken(App, address, chefAddress);
  }));

  const poolPrices = getPoolPrices(tokens, prices, poolToken);

  let aprs = []
    if (poolPrices) {
      const apr = printBaskChefPool(App, chefAbi, chefAddress, prices, tokens, poolPrices,
        baskRewardsPerWeek, sushiRewardsPerWeek, rewardTokenTicker0, rewardTokenTicker1, rewardBaskTokenAddress, rewardSushiTokenAddress,
        pendingRewardsFunction0, pendingRewardsFunction1, poolToken, pendingBaskTokens, pendingSushiTokens, staked, stakingTokenAddress)
      aprs.push(apr);
    }
  let totalUserStaked=0, totalStaked=0, averageApr=0;
  for (const a of aprs) {
    if (a && !isNaN(a.totalStakedUsd)) {
      totalStaked += a.totalStakedUsd;
    }
    if (a && a.userStakedUsd > 0) {
      totalUserStaked += a.userStakedUsd;
      averageApr += a.userStakedUsd * a.yearlyAPR / 100;
    }
  }
  averageApr = averageApr / totalUserStaked;
  _print_bold(`Total Staked: $${formatMoney(totalStaked)}`);
  if (totalUserStaked > 0) {
    _print_bold(`\nYou are staking a total of $${formatMoney(totalUserStaked)} at an average APR of ${(averageApr * 100).toFixed(2)}%`)
    _print(`Estimated earnings:`
        + ` Day $${formatMoney(totalUserStaked*averageApr/365)}`
        + ` Week $${formatMoney(totalUserStaked*averageApr/52)}`
        + ` Year $${formatMoney(totalUserStaked*averageApr)}\n`);
  }
  return { prices, totalUserStaked, totalStaked, averageApr }
}

function printBaskChefPool(App, chefAbi, chefAddr, prices, tokens, poolPrices,
  baskRewardsPerWeek, sushiRewardsPerWeek, rewardTokenTicker0, rewardTokenTicker1, rewardBaskTokenAddress, rewardSushiTokenAddress,
                       pendingRewardsFunction0, pendingRewardsFunction1, poolToken, pendingBaskTokens, pendingSushiTokens, staked,
                       stakingTokenAddress, claimFunction, chain="eth") {
  fixedDecimals =  2;
  const userStaked = staked
  const rewardBaskPrice = getParameterCaseInsensitive(prices, rewardBaskTokenAddress)?.usd;
  const rewardSushiPrice = getParameterCaseInsensitive(prices, rewardSushiTokenAddress)?.usd;
  const staked_tvl = poolPrices.staked_tvl;
  poolPrices.print_price(chain);
  const apr = printBaskAPR(rewardTokenTicker0, rewardTokenTicker1, rewardBaskPrice, rewardSushiPrice, 
    baskRewardsPerWeek, sushiRewardsPerWeek, poolPrices.stakeTokenTicker,
    staked_tvl, userStaked, poolPrices.price, fixedDecimals);
  if (userStaked > 0) poolPrices.print_contained_price(userStaked);
  printBaskContractLinks(App, chefAbi, chefAddr, stakingTokenAddress, pendingRewardsFunction0, pendingRewardsFunction1,
    rewardTokenTicker0, rewardTokenTicker1, poolPrices.stakeTokenTicker, poolToken.unstaked,
    userStaked, pendingBaskTokens, pendingSushiTokens, fixedDecimals, claimFunction, rewardBaskPrice, rewardSushiPrice, chain);
  return apr;
}

function printBaskContractLinks(App, chefAbi, chefAddr, poolAddress, pendingRewardsFunction0, pendingRewardsFunction1,
  rewardTokenTicker0, rewardTokenTicker1, stakeTokenTicker, unstaked, userStaked, pendingBaskTokens, pendingSushiTokens, fixedDecimals,
    claimFunction, rewardBaskPrice, rewardSushiPrice, chain, depositFee, withdrawFee) {
  fixedDecimals = fixedDecimals ?? 2;
  const approveAndStake = async function() {
    return chefContract_stake(chefAbi, chefAddr, poolAddress, App)
  }
  const unstake = async function() {
    return chefContract_unstake(chefAbi, chefAddr, App, pendingRewardsFunction0)
  }
  const claim = async function() {
    return chefContract_claim(chefAbi, chefAddr, App, pendingRewardsFunction0, claimFunction)
  }
  if(depositFee > 0){
    _print_link(`Stake ${unstaked.toFixed(fixedDecimals)} ${stakeTokenTicker} - Fee ${depositFee}%`, approveAndStake)
  }else{
    _print_link(`Stake ${unstaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, approveAndStake)
  }
  if(withdrawFee > 0){
    _print_link(`Unstake ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker} - Fee ${withdrawFee}%`, unstake)
  }else{
    _print_link(`Unstake ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker}`, unstake)
  }
  _print_link(`Claim ${pendingBaskTokens.toFixed(fixedDecimals)} ${rewardTokenTicker0} + ${pendingSushiTokens.toFixed(fixedDecimals)} ${rewardTokenTicker1} A total of ($${formatMoney((pendingBaskTokens*rewardBaskPrice) + (pendingSushiTokens*rewardSushiPrice))})`, claim)
  _print(`Staking or unstaking also claims rewards.`)
  _print("");
}

function printBaskAPR(rewardTokenTicker0, rewardTokenTicker1, rewardBaskPrice, rewardSushiPrice, baskRewardsPerWeek, sushiRewardsPerWeek,
                  stakeTokenTicker, staked_tvl, userStaked, poolTokenPrice,
                  fixedDecimals) {
  var usdBaskPerWeek = baskRewardsPerWeek * rewardBaskPrice;
  var usdSushiPerWeek = sushiRewardsPerWeek * rewardSushiPrice;
  var usdTotalPerWeek = usdBaskPerWeek + usdSushiPerWeek
  fixedDecimals = fixedDecimals ?? 2;
  _print(`${rewardTokenTicker0} Per Week: ${baskRewardsPerWeek.toFixed(fixedDecimals)} ($${formatMoney(usdBaskPerWeek)})`);
  var weeklyBaskAPR = usdBaskPerWeek / staked_tvl * 100;
  var dailyBaskAPR = weeklyBaskAPR / 7;
  var yearlyBaskAPR = weeklyBaskAPR * 52;
  _print(`${rewardTokenTicker1} Per Week: ${sushiRewardsPerWeek.toFixed(fixedDecimals)} ($${formatMoney(usdSushiPerWeek)})`);
  var weeklySushiAPR = usdSushiPerWeek / staked_tvl * 100;
  var dailySushiAPR = weeklySushiAPR / 7;
  var yearlySushiAPR = weeklySushiAPR * 52;
  _print(`BASK APR: Day ${dailyBaskAPR.toFixed(2)}% Week ${weeklyBaskAPR.toFixed(2)}% Year ${yearlyBaskAPR.toFixed(2)}%`);
  var userStakedUsd = userStaked * poolTokenPrice;
  var userStakedPct = userStakedUsd / staked_tvl * 100;
  _print(`SUSHI APR: Day ${dailySushiAPR.toFixed(2)}% Week ${weeklySushiAPR.toFixed(2)}% Year ${yearlySushiAPR.toFixed(2)}%`);
  var userStakedUsd = userStaked * poolTokenPrice;
  var userStakedPct = userStakedUsd / staked_tvl * 100;
  _print(`You are staking ${userStaked.toFixed(fixedDecimals)} ${stakeTokenTicker} ($${formatMoney(userStakedUsd)}), ${userStakedPct.toFixed(2)}% of the pool.`);
  var userBaskWeeklyRewards = userStakedPct * baskRewardsPerWeek / 100;
  var userSushiWeeklyRewards = userStakedPct * sushiRewardsPerWeek / 100;
  var totalUserWeeklyRewards = userBaskWeeklyRewards + userSushiWeeklyRewards;
  var userBaskDailyRewards = userBaskWeeklyRewards / 7;
  var userSushiDailyRewards = userSushiWeeklyRewards / 7;
  let totalUserDailyRewards = userBaskDailyRewards + userSushiDailyRewards
  var userBaskYearlyRewards = userBaskWeeklyRewards * 52;
  var userSushiYearlyRewards = userSushiWeeklyRewards * 52;
  let totalUserYearlyRewards = userBaskYearlyRewards + userSushiYearlyRewards
  let totalRewardPrice = rewardBaskPrice + rewardSushiPrice;
  if (userStaked > 0) {
    _print(`Estimated ${rewardTokenTicker} earnings:`
        + ` Day ${totalUserDailyRewards.toFixed(fixedDecimals)} ($${formatMoney(totalUserDailyRewards*totalRewardPrice)})`
        + ` Week ${totalUserWeeklyRewards.toFixed(fixedDecimals)} ($${formatMoney(totalUserWeeklyRewards*totalRewardPrice)})`
        + ` Year ${totalUserYearlyRewards.toFixed(fixedDecimals)} ($${formatMoney(totalUserYearlyRewards*totalRewardPrice)})`);
  }
  const totalYearlyAPR = yearlyBaskAPR + yearlySushiAPR
  return {
    userStakedUsd,
    totalStakedUsd : staked_tvl,
    userStakedPct,
    totalYearlyAPR,
    userYearlyUsd : totalUserYearlyRewards * totalRewardPrice
  }
}

    async function loadXBasket(App, tokens, prices){
      const XBASKET_ADDR = "0x5C0e75EB4b27b5F9c99D78Fc96AFf7869eDa007b";
      const XBASKET_ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bask","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"enter","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_share","type":"uint256"}],"name":"getRatio","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_share","type":"uint256"}],"name":"leave","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]
      const XBASKET = new ethers.Contract(XBASKET_ADDR, XBASKET_ABI, App.provider);
  
      const baskAddress = await XBASKET.bask();
      const usersBalance = await XBASKET.balanceOf(App.YOUR_ADDRESS);
  
      const bask = await getToken(App, baskAddress, XBASKET_ADDR);
      await getNewPricesAndTokens(App, tokens, prices, [baskAddress], XBASKET_ADDR);
      const poolPrices = getPoolPrices(tokens, prices, bask);
      const weeklyRewards =  0 //has not started yet
      const baskPrice = getParameterCaseInsensitive(prices, baskAddress).usd
      poolPrices.print_price();
      const userStaked = usersBalance / 10 ** bask.decimals
      printAPR("BASK", baskPrice, weeklyRewards, "BASK", poolPrices.staked_tvl, userStaked, poolPrices.price, 2);
      const etherscanUrl = `<a href='https://etherscan.io/address/${XBASKET_ADDR}' target='_blank'>BASK Contract</a>`;
      _print(etherscanUrl);
      const approveAndDeposit = async function() {
        return xBasket_deposit(XBASKET_ABI, XBASKET_ADDR, baskAddress, App);
      }
      const withdraw = async function() {
        return xBasket_withdraw(XBASKET_ABI, XBASKET_ADDR, App)
      }
      _print_link(`Deposit ${bask.unstaked.toFixed(2)} BASK`, approveAndDeposit)
      _print_link(`Withdraw ${(usersBalance / 1e18).toFixed(2)} xBASK`, withdraw)
      _print(`\n`);
    }
  
  const xBasket_deposit = async function(xBasketAbi, xBasketAddress, basketAddress, App) {
    const signer = App.provider.getSigner()
  
    const BASKET = new ethers.Contract(basketAddress, ERC20_ABI, signer)
    const XBASKET = new ethers.Contract(xBasketAddress, xBasketAbi, signer)
  
    const currentTokens = await BASKET.balanceOf(App.YOUR_ADDRESS)
    const allowedTokens = await BASKET.allowance(App.YOUR_ADDRESS, xBasketAddress)
  
    let allow = Promise.resolve()
  
    if (allowedTokens / 1e18 < currentTokens / 1e18) {
      showLoading()
      allow = BASKET.approve(xBasketAddress, ethers.constants.MaxUint256)
        .then(function(t) {
          return App.provider.waitForTransaction(t.hash)
        })
        .catch(function() {
          hideLoading()
          alert('Try resetting your approval to 0 first')
        })
    }
  
    if (currentTokens / 1e18 > 0) {
      showLoading()
      allow
        .then(async function() {
          XBASKET.enter(currentTokens, {gasLimit: 500000})
            .then(function(t) {
              App.provider.waitForTransaction(t.hash).then(function() {
                hideLoading()
              })
            })
            .catch(function() {
              hideLoading()
              _print('Something went wrong.')
            })
        })
        .catch(function() {
          hideLoading()
          _print('Something went wrong.')
        })
    } else {
      alert('You have no tokens to stake!!')
    }
  }
  
  const xBasket_withdraw = async function(xBasketAbi, xBasketAddress, App) {
    const signer = App.provider.getSigner()
    const XBASKET = new ethers.Contract(xBasketAddress, xBasketAbi, signer)
  
    const balance = await XBASKET.balanceOf(App.YOUR_ADDRESS)
  
    if (balance / 1e18 > 0) {
      showLoading()
      const t = await XBASKET.withdraw(balance, {gasLimit: 500000});
      return App.provider.waitForTransaction(t.hash);
    }
  }
  