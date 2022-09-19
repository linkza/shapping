<template>
	<view class="search-container">
		<view class="search-box">
			<uni-search-bar @input="input" :radius="100" cancelButton="none" ></uni-search-bar>
		</view>
		<view class="history-box" v-if="searchResults.length===0">
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="17" @click="clearHistory"></uni-icons>
			</view>
			<view class="history-list">
				<uni-tag :text="item" type="default" v-for="(item,index) in histories" :key="index" @click="gotoGoodsList(item)"></uni-tag>
			</view>
		</view>
		<view class="sugg-list" v-else>
			<view class="sugg-item" v-for="(item,index) in searchResults" :key="index" @click="gotoDetail(item.goods_id)">
				<view class="goods-name">
					{{item.goods_name}}
				</view>
				<uni-icons type="right" size="16"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer:null,
				kw:"",
				searchResults:[],
				historyList:[]
			}
		},
		onLoad() {
			this.historyList=JSON.parse(uni.getStorageSync('kw')||'[]')
		},
		methods:{
			input(e){
				clearTimeout(this.timer)
				this.timer = setTimeout(()=> {
					this.kw=e
					this.getSearchList()
				}, 500)

			},
			async getSearchList(){
				if(this.kw===''){
					this.searchResults=[]
					return
				}
				const {data:res}=await uni.$http.get('/api/public/v1/goods/qsearch',{query:this.kw})
				this.searchResults=res.message
				this.saveSearchHistory()
			},
			gotoDetail(id){
				uni.navigateTo({
					url:'/subpkg/good_detail/good_detail?good_id='+id
				})
			},
			gotoGoodsList(kw){
				uni.navigateTo({
					url:'/subpkg/good_list/good_list?query='+kw
				})
			},
			saveSearchHistory(){
				const set =new Set(this.historyList)
				set.delete(this.kw)
				set.add(this.kw)
				this.historyList=Array.from(set)
				uni.setStorageSync('kw',JSON.stringify(this.historyList))
			},
			clearHistory(){
				this.historyList=[]
				uni.setStorageSync('kw','[]')
			}
		},
		computed:{
			histories(){
				return this.historyList.reverse()
			}
		}
	}
</script>

<style lang="scss">
	.search-container {
		height: 100vh;
		overflow: auto;
	}
	
	.search-container::-webkit-scrollbar {
		width: 0;
		height: 0;
		background-color: transparent;
	}
.search-box{
	position: sticky;
	top: 0;
	z-index: 999;
}
.sugg-list{
	padding: 0 5px;
	.sugg-item{
		font-size: 24rpx;
		padding: 26rpx 0;
		border-bottom: 1px solid #efefef;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.goods-name{
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			margin-right: 3px;
		}
	}
}
.history-box{
	padding: 0 5px;
	.history-title{
		display: flex;
		justify-content: space-between;
		height: 40px;
		align-items: center;
		font-size: 26rpx;
		border-bottom: 1px solid #efefef;
	}
	.history-list{
		display: flex;
		flex-wrap: wrap;
		.uni-tag{
		display: block;	
		margin-right: 5px;
		}

	}
}
</style>
