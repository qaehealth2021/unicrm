Ext.namespace('QH.boxtSolution');

$importKey(IMPORT_GRID);
$importKeyCss(IMPORT_GRID_CSS);
$importKey(IMPORT_BOXMATERIAL_COMBO);

$import('systemdic/boxtsolution/js/boxtSolutionStore.js');
$import('systemdic/boxtsolution/js/boxtSolutionGrid.js');
$import('systemdic/boxtsolution/js/boxtSolutionToolbar.js');

Ext.onReady(function(){ 
	QHERP_VIEWPORT = new Ext.Viewport({
		layout:'fit',
		items:[{
			xtype:'boxtsolutiongrid',
			ref:'gridPanel'
		}]
	});
});
