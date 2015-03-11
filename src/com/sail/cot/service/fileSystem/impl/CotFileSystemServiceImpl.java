/**
 * 
 */
package com.sail.cot.service.fileSystem.impl;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jason.core.exception.DAOException;
import com.sail.cot.common.service.impl.BaseServiceImpl;
import com.sail.cot.common.util.ContextUtil;
import com.sail.cot.constants.Constants;
import com.sail.cot.domain.CotFileSystem;
import com.sail.cot.domain.CotFileSystemShare;
import com.sail.cot.domain.CotFileTree;
import com.sail.cot.service.fileSystem.CotFileSystemService;
import com.sail.cot.service.fileSystem.FileTreeNode;
import com.sail.cot.util.GridServerHandler;

/**
 * <p>Title: 旗航外贸管理软件V8.0</p>
 * <p>Description:</p>
 * <p>Copyright: Copyright (c) 2011</p>
 * <p>Company: 厦门市旗航软件有限公司</p>
 * <p>Create Time: Oct 31, 2012 9:32:10 AM </p>
 * <p>Class Name: CotFileSystemServiceImpl.java </p>
 * @author achui
 *
 */
@Service("CotFileSystemService")
@Transactional
public class CotFileSystemServiceImpl extends BaseServiceImpl implements CotFileSystemService{

	@Override
	public String getFileTreeJson(Integer empsId,Integer fileTreeId) {
		String treeJson = null;
		List<FileTreeNode> listNode = new ArrayList<FileTreeNode>();
		String hql = " from CotFileTree obj where 1=1 and  obj.empsId = "+empsId;
		if(fileTreeId == 0){
			//0表示查询改用户的所有根节点
			hql +=" and obj.parentId is null";
		}else {
			hql +=" and obj.parentId = "+fileTreeId;
		}
		List<CotFileTree> list = super.findRecordByHql(hql);
		if(CollectionUtils.isNotEmpty(list)){
			for(CotFileTree fileTree : list){
				FileTreeNode treeNode = new FileTreeNode();
				treeNode.setIconCls("folder");
				//treeNode.setHref("javascript:function(){}");
				treeNode.setText(fileTree.getNodeName());
				treeNode.setId(fileTree.getId().toString());
				treeNode.setLeaf(false);
				treeNode.setFileFlag("MU");
				listNode.add(treeNode);
			}
		}
		GridServerHandler handler = new GridServerHandler(new String[]{"children"});
		handler.setData(listNode);
		handler.setTotalCount(list.size());
		treeJson = handler.getLoadDataText();
		System.out.println(treeJson);
		return treeJson;
	}
	
	/*
	 * (non-Javadoc)
	 * @see com.sail.cot.service.fileSystem.CotFileSystemService#deleteFile(java.util.List)
	 */
	public void deleteFile(List<Integer> ids)throws Exception {
		//先删除文档的共享记录
		String deleteSql="delete from CotFileSystemShare obj where obj.fileSystemId in (:ids)";
		Map delMap=new HashMap();
		delMap.put("ids",ids);
		this.getBaseDao().executeUpdate(deleteSql,null,delMap);
		String hql = "from CotFileSystem where id in (:ids)";
		Map map=new HashMap();
		map.put("ids", ids);
		List<CotFileSystem> list = this.getBaseDao().findRecordsByHql(hql, map);
		if(list != null){
			for (CotFileSystem fileSystem : list) {
				this.getBaseDao().delete(fileSystem);
				if(fileSystem.getMoveSourceNode() == null){
					String path = fileSystem.getFilePath();
					this.removeDiskFile(path);
				}
			}
		}
	}

	/* (non-Javadoc)
	 * @see com.sail.cot.service.fileSystem.CotFileSystemService#removeDiskFile(java.lang.String)
	 */
	@Override
	public void removeDiskFile(String filePath) {
		String prefixPath = ContextUtil.getLocalTomcatHome()+Constants.DEFAULT_UPLOAD_FILE;
		File file = new File(prefixPath+filePath);
		try {
			FileUtils.forceDelete(file);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public List<CotFileSystem> getCotFileSystemList(List<Integer> ids) {
		if(ids ==null || ids.size()==0)
			return null;
		String hql = "from CotFileSystem where id in (:ids)";
		Map map=new HashMap();
		map.put("ids", ids);
		List<CotFileSystem> list = this.getBaseDao().findRecordsByHql(hql, map);
		return list;
	}
	
	public void saveFileShares(Integer[] fileSystemIds,Integer[] emps) throws DAOException{
		List list =new ArrayList();
		List ids =new ArrayList();
		for (int i = 0; i < fileSystemIds.length; i++) {
			ids.add(fileSystemIds[i]);
			for (int j = 0; j < emps.length; j++) {
				//查询是否已经把该文档共享给该员工,是的话不再共享
				String hql="select obj.id from CotFileSystemShare obj where obj.empsId="+emps[j]+" and obj.fileSystemId="+fileSystemIds[i];
				List listFind=this.getBaseDao().find(hql);
				if(listFind.size()==0){
					CotFileSystemShare  share=new CotFileSystemShare();
					share.setEmpsId(emps[j]);
					share.setFileSystemId(fileSystemIds[i]);
					list.add(share);
				}
			}
		}
		//修改文档的状态fileFlag为MS
		String hqlUpdate="update CotFileSystem obj set obj.fileFlag='MS' where obj.id in (:ids)";
		Map map=new HashMap();
		map.put("ids",ids);
		this.getBaseDao().executeUpdate(hqlUpdate, null,map);
		this.getBaseDao().saveRecords(list);
	}
	
	public void deleteFileShares(Integer[] fileSystemIds,Integer[] emps) throws DAOException{
		List list =new ArrayList();
		for (int i = 0; i < fileSystemIds.length; i++) {
			for (int j = 0; j < emps.length; j++) {
				String hql="delete from CotFileSystemShare obj " +
						"where obj.fileSystemId="+fileSystemIds[i]+" and obj.empsId="+emps[j];
				this.getBaseDao().executeUpdate(hql, null);
			}
			//如果该文件已经删除了全部被共享的员工,则需要把该文件状态改成未共享
			String fhql="select count(*) from CotFileSystemShare obj where obj.fileSystemId="+fileSystemIds[i];
			List listFind=this.getBaseDao().find(fhql);
			Long count=(Long) listFind.get(0);
			if(count==0){
				CotFileSystem cotFileSystem=(CotFileSystem) this.getBaseDao().getById(CotFileSystem.class, fileSystemIds[i]);
				cotFileSystem.setFileFlag("MU");
				this.saveOrUpdateObj(cotFileSystem);
			}
		}
		
	}
	
	public void saveShareCommon(List<Integer> fileSystemIds,boolean flag) throws DAOException{
		//删除所选文档的已共享记录
		String hql="delete from CotFileSystemShare obj " +
				"where obj.fileSystemId in (:ids)";
		Map delMap=new HashMap();
		delMap.put("ids",fileSystemIds);
		this.getBaseDao().executeUpdate(hql, null,delMap);
		
		String hqlUpdate="update CotFileSystem obj set obj.fileFlag=:fileFlag where obj.id in (:ids)";
		Map map=new HashMap();
		if(!flag){
			map.put("fileFlag","PS");
		}else{
			map.put("fileFlag","MU");
		}
		map.put("ids",fileSystemIds);
		this.getBaseDao().executeUpdate(hqlUpdate, null,map);
	}
	public void saveOutShare(List<Integer> fileSystemIds) throws DAOException{
		//删除所选文档的已共享记录
		String hql="delete from CotFileSystemShare obj " +
				"where obj.fileSystemId in (:ids)";
		Map delMap=new HashMap();
		delMap.put("ids",fileSystemIds);
		this.getBaseDao().executeUpdate(hql, null,delMap);
		
		String hqlUpdate="update CotFileSystem obj set obj.fileFlag='MU' where obj.id in (:ids)";
		Map map=new HashMap();
		map.put("ids",fileSystemIds);
		this.getBaseDao().executeUpdate(hqlUpdate, null,map);
	}
	
	public List<Integer> findShareToMe(Integer empId){
		String hql="select obj.fileSystemId from CotFileSystemShare obj where obj.empsId="+empId;
		return this.getBaseDao().find(hql);
	}

}
