package com.sail.cot.service.fileSystem.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.collections.CollectionUtils;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jason.core.exception.DAOException;
import com.sail.cot.common.service.impl.BaseServiceImpl;
import com.sail.cot.common.util.Log4WebUtil;
import com.sail.cot.domain.CotFileSystem;
import com.sail.cot.domain.CotFileTree;
import com.sail.cot.query.QueryInfo;
import com.sail.cot.service.fileSystem.CotFileSystemService;
import com.sail.cot.service.fileSystem.CotFileTreeService;

@Service("CotFileTreeService")
@Transactional
public class CotFileTreeServiceImpl extends BaseServiceImpl implements CotFileTreeService{
	
	private Logger logger = Log4WebUtil.getLogger(CotFileTreeServiceImpl.class);
	
	@Resource(name="CotFileSystemService")
	private CotFileSystemService fileSystemService;
	
	public Integer saveFileTree(CotFileTree cotFileTree){
		List records = new ArrayList();
		super.saveOrUpdateObj(cotFileTree);
		return cotFileTree.getId();
	}
	public void renameTreeNode(Integer nodeId,String nodeName){
		CotFileTree fileTree = (CotFileTree)super.getObjByIntegerId(Integer.valueOf(nodeId),"CotFileTree");
		fileTree.setNodeName(nodeName);
		this.saveOrUpdateObj(fileTree);
	}
	
	@SuppressWarnings("unchecked")
	public void moveFileToNode(Integer nodeId,List<Integer> ids){
		String hql = "update CotFileSystem set fileTreeId = :nodeId where id in(:ids)";
		QueryInfo queryInfo = new QueryInfo();
		queryInfo.setSelectString(hql);
		Map map = new HashMap();
		map.put("nodeId", nodeId);
		map.put("ids", ids);
		super.updateOrDelTable(hql, map);
	}
	
	@SuppressWarnings("unchecked")
	public void deleteNode(Integer nodeId) throws DAOException{
		List<Integer> allIds = new ArrayList<Integer>();
		this.getAllChild(nodeId, allIds);
		if(!allIds.contains(nodeId)){
			allIds.add(nodeId);
		}
		//删除物理文件
		String hql = " from CotFileSystem obj where obj.fileTreeId in (:allIds)";
		Map<String, Object> whereMap = new HashMap<String, Object>();
		whereMap.put("allIds", allIds);
		List<CotFileSystem> fileList = super.findRecordByHql(hql, whereMap);
		if(CollectionUtils.isNotEmpty(fileList)){
			for(CotFileSystem file : fileList){
				this.fileSystemService.removeDiskFile(file.getFilePath());
			}
		}
		List ids = new ArrayList();
		ids.add(nodeId);
		super.deleteIntListReturnIds(ids, "CotFileTree");
	}
	
	public void moveToNode(Integer id, Integer parentId) {
		CotFileTree cotFileTree = (CotFileTree)super.getObjByIntegerId(id, "CotFileTree");
		cotFileTree.setParentId(parentId);
		super.saveOrUpdateObj(cotFileTree);
	}
	
	/**
	 * @see 功能描述（必填）：递归获取父节点下面的所有子节点的ID,存在ids列表中
	 * @see 处理流程（选填）：
	 * @see 调用例子（必填）：
	 * @see 相关说明文件：
	 * @see <p>Author:achui</p>
	 * @see <p>Create Time:Oct 31, 2012 3:17:47 PM</p>
	 * @param parentId
	 * 返回值：void
	 */
	private void getAllChild(Integer parentId,List ids){
		List<CotFileTree> list = super.findRecordByHql(" from CotFileTree where parentId = "+parentId);
		if(CollectionUtils.isNotEmpty(list)){
			for(CotFileTree fileTree : list){
				getAllChild(fileTree.getId(), ids);
			}
		}else{
			if(!ids.contains(parentId))
				ids.add(parentId);
		}
	}
}
