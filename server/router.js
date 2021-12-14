const express = require("express");
const router = express.Router();
const sqlClient = require("./config")
const jwt = require("jsonwebtoken");
const url = require("url");
const fs = require("fs");
const multer = require("multer");


/**
 * 注册
 */
router.post("/register", (req, res) => {
    const {
        username,
        password,
        email
    } = req.body;
    const sql = "insert into user values(null,?,?,?,CURRENT_TIMESTAMP)";
    const arr = [username, password, email]
    sqlClient(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "注册成功"
            })
        } else {
            res.send({
                status: 401,
                msg: '注册失败'
            })
        }
    })
})

/**
 * 登陆
 */
router.post("/login", (req, res) => {
    const {
        username,
        password,
    } = req.body;
    const sql = "select * from user where username=? and password=?";
    const arr = [username, password];
    sqlClient(sql, arr, result => {
        if (result.length > 0) {
            let token = jwt.sign({
                username,
                id: result[0].id
            }, 'soomekeys')
            res.send({
                status: 200,
                token,
                username,
              
            })
        } else {
            res.send({
                status: 401,
                msg: "登陆失败"
            })
        }
    })
})


/**
 * 后面要联调
 */

/**
 * 商品查询
 */
router.get("/backend/item/selectTbItemAllByPage", (req, res) => {
    // 分页
    const page = url.parse(req.url, true).query.page || 1;
    const sql = "select * from project order by id desc limit 10 offset " + (page - 1) * 10;
    sqlClient(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result,
            })
        } else {
            res.send({
                status: 401,
                msg: "暂无数据"
            })
        }
    })
})

/**
 * 商铺查询
 */
 router.get("/backend/item/selectTbshopAllByPage", (req, res) => {
    // 分页
    const page = url.parse(req.url, true).query.page || 1;
    const sql = "select * from shangdian order by id desc limit 10 offset " + (page - 1) * 10;
    sqlClient(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result,
            })
        } else {
            res.send({
                status: 401,
                msg: "暂无数据"
            })
        }
    })
})
router.get("/backend/item/selectCustomerAllByPage", (req, res) => {
    // 分页
    const page = url.parse(req.url, true).query.page || 1;
    const sql = "select * from customer order by id desc limit 10 offset " + (page - 1) * 10;
    sqlClient(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result,
            })
        } else {
            res.send({
                status: 401,
                msg: "暂无数据"
            })
        }
    })
})
router.get("/backend/item/selectUserAllByPage", (req, res) => {
    // 分页
    const page = url.parse(req.url, true).query.page || 1;
    const sql = "select * from user order by id desc limit 8 offset " + (page - 1) * 8;
    sqlClient(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result,
            })
        } else {
            res.send({
                status: 401,
                msg: "暂无数据"
            })
        }
    })
})
router.get("/backend/item/selectList", (req, res) => {
    // 分页
    const page = url.parse(req.url, true).query.page || 1;
    const sql = "select * from list order by id desc";
    sqlClient(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result,
            })
        } else {
            res.send({
                status: 401,
                msg: "暂无数据"
            })
        }
    })
})
router.get("/backend/item/selectBack", (req, res) => {
    // 分页
    const page = url.parse(req.url, true).query.page || 1;
    const sql = "select * from back order by id desc limit 10 offset " + (page - 1) * 10;
    sqlClient(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result,
            })
        } else {
            res.send({
                status: 401,
                msg: "暂无数据"
            })
        }
    })
})
router.get("/backend/item/selectBackList", (req, res) => {
    // 分页
    const page = url.parse(req.url, true).query.page || 1;
    const sql = "select * from backlist order by id desc limit 9 offset " + (page - 1) * 9;
    sqlClient(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result,
            })
        } else {
            res.send({
                status: 401,
                msg: "暂无数据"
            })
        }
    })
})
/**
 * 商品总条数
 */
router.get("/total", (req, res) => {
    const sql = "select count(*) from project where id";
    sqlClient(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无更多数据"
            })
        }
    })
})
/**
 * 商铺总条数
 */
 router.get("/shoptotal", (req, res) => {
    const sql = "select count(*) from shangdian where id";
    sqlClient(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无更多数据"
            })
        }
    })
})
router.get("/customertotal", (req, res) => {
    const sql = "select count(*) from customer where id";
    sqlClient(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无更多数据"
            })
        }
    })
})
router.get("/usertotal", (req, res) => {
    const sql = "select count(*) from user where id";
    sqlClient(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无更多数据"
            })
        }
    })
})
router.get("/totalBList", (req, res) => {
    const sql = "select count(*) from backlist where id";
    sqlClient(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无更多数据"
            })
        }
    })
})
//地图数据
router.get("/customerFujian", (req, res) => {
    const sql = "select registerAdd from customer where registerAdd='福建'";
    sqlClient(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } 
    })
})
router.get("/customerGuangdong", (req, res) => {
    const sql = "select registerAdd from customer where registerAdd='广东'";
    sqlClient(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } 
    })
})
router.get("/customerShanghai", (req, res) => {
    const sql = "select registerAdd from customer where registerAdd='上海'";
    sqlClient(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } 
    })
})
router.get("/customerJiangsu", (req, res) => {
    const sql = "select registerAdd from customer where registerAdd='江苏'";
    sqlClient(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } 
    })
})
router.get("/customerBeijing", (req, res) => {
    const sql = "select registerAdd from customer where registerAdd='北京'";
    sqlClient(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } 
    })
})
router.get("/customerGansu", (req, res) => {
    const sql = "select registerAdd from customer where registerAdd='甘肃'";
    sqlClient(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } 
    })
})
router.get("/customerYunnan", (req, res) => {
    const sql = "select registerAdd from customer where registerAdd='云南'";
    sqlClient(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } 
    })
})
router.get("/customerGuizhou", (req, res) => {
    const sql = "select registerAdd from customer where registerAdd='贵州'";
    sqlClient(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } 
    })
})
router.get("/customerHainan", (req, res) => {
    const sql = "select registerAdd from customer where registerAdd='海南'";
    sqlClient(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } 
    })
})

/**
 * 模糊查询
 */
router.get("/search", (req, res) => {
    const search = url.parse(req.url, true).query.search;
    const sql = "select * from project where concat(`title`,`brand`,`descs`) like '%" + search + "%'";
    sqlClient(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})
router.get("/searchBacklist", (req, res) => {
    const search = url.parse(req.url, true).query.search;
    const sql = "select * from backlist where concat(`name`) like '%" + search + "%'";
    sqlClient(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})
router.get("/searchCustomer", (req, res) => {
    const search = url.parse(req.url, true).query.search;
    const sql = "select * from customer where concat(`username`,`registerAdd`) like '%" + search + "%'";
    sqlClient(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})
/**
 * 模糊查询商铺
 */
 router.get("/searchshop", (req, res) => {
    const search = url.parse(req.url, true).query.search;
    const sql = "select * from shangdian where concat(`name`,`description`) like '%" + search + "%'";
    sqlClient(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})
router.get("/searchuser", (req, res) => {
    const search = url.parse(req.url, true).query.search;
    const sql = "select * from user where concat(`username`,`email`) like '%" + search + "%'";
    sqlClient(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})
router.get("/searchList", (req, res) => {
    const search = url.parse(req.url, true).query.search;
    const sql = "select * from list where concat(`id`,`Pname`,`creatData`) like '%" + search + "%'";
    sqlClient(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})
/**
 * 商品类目选择
 */
router.get("/backend/itemCategory/selectItemCategoryByParentId", (req, res) => {
    const id = url.parse(req.url, true).query.id || 1;
    const sql = "select * from category where id=?";
    const arr = [id]
    sqlClient(sql, arr, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})


/**
 * 上传图片
 */
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./upload/")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
})

var createFolder = function (folder) {
    try {
        fs.accessSync(folder);
    } catch (e) {
        fs.mkdirSync(folder);
    }
}

var uploadFolder = './upload/';
createFolder(uploadFolder);
var upload = multer({
    storage: storage
});

router.post('/upload', upload.single('file'), function (req, res, next) {
    var file = req.file;
    console.log('文件类型：%s', file.mimetype);
    console.log('原始文件名：%s', file.originalname);
    console.log('文件大小：%s', file.size);
    console.log('文件保存路径：%s', file.path);
    res.json({
        res_code: '0',
        name: file.originalname,
        url: file.path
    });
});
// ---------------------------------------------------------------------------
/**
 * 添加商品
 */
router.get("/backend/item/insertTbItem", (req, res) => {
    const cid = url.parse(req.url, true).query.cid || '';
    const title = url.parse(req.url, true).query.title || '';
    const brand = url.parse(req.url, true).query.brand || '';
    const price = url.parse(req.url, true).query.price || '';
    const num = url.parse(req.url, true).query.num || '';
    const image = url.parse(req.url, true).query.image || '';
    const desc = url.parse(req.url, true).query.desc || '';
    const sql = "insert into project values (null,?,?,?,?,?,?,'',1,'',?)";
    const arr = [title, image, brand, price, cid, num, desc];
    sqlClient(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "添加成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "添加失败"
            })
        }
    })
})
router.get("/backend/item/insertreason", (req, res) => {
    const reason = url.parse(req.url, true).query.reason || '';
    const sql = "insert into back values (null,?,CURRENT_TIMESTAMP)";
    const arr = [reason];
    sqlClient(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "添加成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "添加失败"
            })
        }
    })
})
/**
 * 添加商铺
 */
 router.get("/backend/item/insertTbShopItem", (req, res) => {
    const name = url.parse(req.url, true).query.name || '';
    const phone = url.parse(req.url, true).query.phone || '';
    const address = url.parse(req.url, true).query.address || '';
    const description = url.parse(req.url, true).query.description || '';
    const image = url.parse(req.url, true).query.image || '';
    const imagee = url.parse(req.url, true).query.imagee || '';
    const sql = "insert into shangdian values (null,?,?,?,?,'',1,'','',?,?)";
    const arr = [name,phone, address ,description,image,imagee];
    sqlClient(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "添加成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "添加失败"
            })
        }
    })
})
/**
 * 
 * 商品删除
 * 
 */
router.get("/backend/item/deleteItemById", (req, res) => {
    const id = url.parse(req.url, true).query.id;
    const sql = "delete from project where id=?"
    const arr = [id];
    sqlClient(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "删除成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "删除失败"
            })
        }
    })
})

router.get("/backend/item/deleteSellBack", (req, res) => {
    const id = url.parse(req.url, true).query.id;
    const sql = "delete from back where id=?"
    const arr = [id];
    sqlClient(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "删除成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "删除失败"
            })
        }
    })
})
router.get("/backend/item/deleteSellBackList", (req, res) => {
    const id = url.parse(req.url, true).query.id;
    const sql = "delete from backlist where id=?"
    const arr = [id];
    sqlClient(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "删除成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "删除失败"
            })
        }
    })
})
/**
 * 
 * 商铺删除
 * 
 */
 router.get("/backend/item/deleteshopItemById", (req, res) => {
    const id = url.parse(req.url, true).query.id;
    const sql = "delete from shangdian where id=?"
    const arr = [id];
    sqlClient(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "删除成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "删除失败"
            })
        }
    })
})
router.get("/backend/item/deleteUser", (req, res) => {
    const id = url.parse(req.url, true).query.id;
    const sql = "delete from user where id=?"
    const arr = [id];
    sqlClient(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "删除成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "删除失败"
            })
        }
    })
})
router.get("/backend/item/deleteCustomer", (req, res) => {
    const id = url.parse(req.url, true).query.id;
    const sql = "delete from customer where id=?"
    const arr = [id];
    sqlClient(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "删除成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "删除失败"
            })
        }
    })
})
router.get("/backend/item/deleteList", (req, res) => {
    const id = url.parse(req.url, true).query.id;
    const sql = "delete from list where id=?"
    const arr = [id];
    sqlClient(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "删除成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "删除失败"
            })
        }
    })
})
/**
 * 
 * 预更新
 * 
 */
router.get("/backend/item/preUpdateItem", (req, res) => {
    const id = url.parse(req.url, true).query.id;
    const sql = "select * from project where id=?";
    sqlClient(sql, [id], result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "预更新失败"
            })
        }
    })
})
router.get("/backend/item/preReason", (req, res) => {
    const id = url.parse(req.url, true).query.id;
    const sql = "select * from back where id=?";
    sqlClient(sql, [id], result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "预更新失败"
            })
        }
    })
})
router.get("/backend/item/preUpdateList", (req, res) => {
    const id = url.parse(req.url, true).query.id;
    const sql = "select tag from list where id=?";
    sqlClient(sql, [id], result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "预更新失败"
            })
        }
    })
})

router.get("/backend/item/preUpdateShop", (req, res) => {
    const id = url.parse(req.url, true).query.id;
    const sql = "select * from shangdian where id=?";
    sqlClient(sql, [id], result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "预更新失败"
            })
        }
    })
})
router.get("/backend/item/prebackList", (req, res) => {
    const id = url.parse(req.url, true).query.id;
    const sql = "select * from backlist where id=?";
    sqlClient(sql, [id], result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "预更新失败"
            })
        }
    })
})
/**
 * 商品编辑
 */
router.get("/backend/item/updateTbItem", (req, res) => {
    const id = url.parse(req.url, true).query.id;
    const cid = url.parse(req.url, true).query.cid || '';
    const title = url.parse(req.url, true).query.title || '';
    const brand = url.parse(req.url, true).query.brand || '';
    const price = url.parse(req.url, true).query.price || '';
    const num = url.parse(req.url, true).query.num || '';
    const image = url.parse(req.url, true).query.image || '';
    const desc = url.parse(req.url, true).query.desc || '';
    const sql = "update project set title=?,brand=?,cid=?,price=?,num=?,descs=?,image=? where id=?"
    const arr = [title, brand, cid, price, num, desc, image, id];
    sqlClient(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "修改成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "修改失败"
            })
        }
    })
})
router.get("/backend/item/updateShop", (req, res) => {
    const id = url.parse(req.url, true).query.id || '';
    const name = url.parse(req.url, true).query.name || '';
    const phone = url.parse(req.url, true).query.phone || '';
    const address = url.parse(req.url, true).query.address || '';
    const description = url.parse(req.url, true).query.description || '';
    const image = url.parse(req.url, true).query.image || '';
    const imagee = url.parse(req.url, true).query.imagee || '';
    const sql = "update shangdian set name=?,phone=?,address=?,description=?,image=?,imagee=? where id=?"
    const arr = [name, phone, address, description, image, imagee, id];
    sqlClient(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "修改成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "修改失败"
            })
        }
    })
})
router.get("/backend/item/updateList", (req, res) => {
    const id = url.parse(req.url, true).query.id;
    const tag = url.parse(req.url, true).query.tag || '';
    const sql = "update list set tag=? where id=?"
    const arr = [tag, id];
    sqlClient(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "修改成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "修改失败"
            })
        }
    })
})
router.get("/backend/item/updateReason", (req, res) => {
    const id = url.parse(req.url, true).query.id;
    const reason = url.parse(req.url, true).query.reason || '';
    const sql = "update back set reason=? where id=?"
    const arr = [reason, id];
    sqlClient(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "修改成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "修改失败"
            })
        }
    })
})
router.get("/backend/item/updateCheck", (req, res) => {
    const id = url.parse(req.url, true).query.id;
    const waitState = url.parse(req.url, true).query.waitState || '';
    const result = url.parse(req.url, true).query.result || '';
    const sql = "update backlist set waitState=?,result=? where id=?"
    const arr = [waitState,result,id];
    sqlClient(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "修改成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "修改失败"
            })
        }
    })
})
//当前登录
router.get("/searchUser", (req, res) => {
    const search = url.parse(req.url, true).query.search;
    const sql = "select * from user where  find_in_set('" + search + "',username)"
    sqlClient(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})

//修改密码
router.get("/backend/item/updatePassword", (req, res) => {
    const id = url.parse(req.url, true).query.id;
    const username = url.parse(req.url, true).query.username || '';
    const password = url.parse(req.url, true).query.password || '';
    const email = url.parse(req.url, true).query.email || '';
    const sql = "update user set username=?,password=?,email=? where id=?"
    const arr = [username, password, email, id];
    sqlClient(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "修改成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "修改失败"
            })
        }
    })
})
/**
 * 删除
 */
router.get("/content/deleteContentCategoryById",(req,res)=>{
    const pid = url.parse(req.url, true).query.pid;
    const sql = "delete from content where pid=?"
    sqlClient(sql,[pid],result =>{
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "删除成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "删除失败"
            })
        }
    })
})


module.exports = router;