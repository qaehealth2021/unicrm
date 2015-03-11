package com.sail.cot.service.fileSystem;

import java.util.List;

import com.jason.core.exception.DAOException;
import com.sail.cot.domain.CotFileTree;

public interface CotFileTreeService {
	
	public Integer saveFileTree(CotFileTree cotFileTree);
	
	public void renameTreeNode(Integer nodeId,String nodeName);
	
	public void moveFileToNode(Integer nodeId,List<Integer> ids);
	
	public void deleteNode(Integer nodeId) throws DAOException;
	
	public void moveToNode(Integer id,Integer parentId);
}
