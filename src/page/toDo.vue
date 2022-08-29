<template>
    <div class="ordering">
        <el-button @click="fas">test</el-button>
    </div>
</template>

<script>


import { getMerchant} from "../../api/api";
import {ElMessage} from "element-plus";

export default{
    setup(){
        const fas = ()=>{
          getMerchant({
            sb:"sb"
          }).then((res) => {
            if(res.data.code==200) {
              ElMessage.error(res.data.msg);
            }else{
              ElMessage.error(res.data.msg);
            }
          }).catch((err) => console.log(err));
        }
        
        return {fas}
    }
}
</script>

<style>

</style>